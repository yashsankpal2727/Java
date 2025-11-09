import { NextRequest, NextResponse } from 'next/server';

// Mock video generation - In production, integrate with RunwayML, Pika, etc.
export async function POST(request: NextRequest) {
  try {
    const { prompt, style, duration = 5 } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Simulate API delay (longer for video)
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Generate mock video using placeholder
    const seed = Math.floor(Math.random() * 10000);
    
    // Using sample video URLs (in production, this would be from your AI service)
    const videoUrls = [
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    ];
    
    const videoUrl = videoUrls[seed % videoUrls.length];
    const thumbnailUrl = `https://picsum.photos/seed/${seed}/1024/1024`;

    const generatedMedia = {
      id: `vid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'video' as const,
      prompt,
      style,
      url: videoUrl,
      thumbnail: thumbnailUrl,
      duration,
      createdAt: new Date(),
    };

    return NextResponse.json(generatedMedia);
  } catch (error) {
    console.error('Video generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate video' },
      { status: 500 }
    );
  }
}
