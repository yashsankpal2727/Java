import { NextRequest, NextResponse } from 'next/server';

// Mock image generation - In production, integrate with Replicate, Stability AI, etc.
export async function POST(request: NextRequest) {
  try {
    const { prompt, style } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate mock image using placeholder service
    const width = 1024;
    const height = 1024;
    const seed = Math.floor(Math.random() * 10000);
    
    // Using picsum.photos for placeholder images
    const imageUrl = `https://picsum.photos/seed/${seed}/${width}/${height}`;

    const generatedMedia = {
      id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'image' as const,
      prompt,
      style,
      url: imageUrl,
      createdAt: new Date(),
    };

    return NextResponse.json(generatedMedia);
  } catch (error) {
    console.error('Image generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
}
