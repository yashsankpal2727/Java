import { NextRequest, NextResponse } from 'next/server';

// Mock batch generation
export async function POST(request: NextRequest) {
  try {
    const { items } = await request.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Items array is required' },
        { status: 400 }
      );
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    const results = items.map((item, index) => {
      const seed = Math.floor(Math.random() * 10000);
      const isVideo = item.type === 'video';

      if (isVideo) {
        const videoUrls = [
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        ];

        return {
          id: `vid-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`,
          type: 'video' as const,
          prompt: item.prompt,
          style: item.style,
          url: videoUrls[seed % videoUrls.length],
          thumbnail: `https://picsum.photos/seed/${seed}/1024/1024`,
          duration: item.duration || 5,
          createdAt: new Date(),
        };
      } else {
        return {
          id: `img-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`,
          type: 'image' as const,
          prompt: item.prompt,
          style: item.style,
          url: `https://picsum.photos/seed/${seed}/1024/1024`,
          createdAt: new Date(),
        };
      }
    });

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Batch generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate batch' },
      { status: 500 }
    );
  }
}
