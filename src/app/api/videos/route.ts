import { NextResponse } from 'next/server';
import { VideoContentService } from '@/services/videoContentService';
import { z } from 'zod';

// Validation schemas
const videoCreateSchema = z.object({
  url: z.string().url(),
  title: z.string(),
  creator: z.string(),
  createdDate: z.string().transform((str: string) => new Date(str)),
  duration: z.string(),
  attribution: z.string(),
  thumbnailUrl: z.string().url().optional(),
  tags: z.array(z.string()),
  license: z.object({
    type: z.enum(['own', 'licensed', 'creative-commons', 'partnership']),
    startDate: z.string().transform((str: string) => new Date(str)),
    expirationDate: z.string().transform((str: string) => new Date(str)).optional(),
    terms: z.array(z.string()),
    restrictions: z.array(z.string()),
    territoryRestrictions: z.array(z.string()),
    renewalTerms: z.string().optional()
  })
});

type VideoCreateSchema = z.infer<typeof videoCreateSchema>;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as 'active' | 'expired' | 'expiring-soon' | null;
    const territory = searchParams.get('territory');

    let videos;
    if (status) {
      videos = await VideoContentService.getVideosByLicenseStatus(status);
    } else if (territory) {
      videos = await VideoContentService.getVideosByTerritory(territory);
    } else {
      videos = await VideoContentService.getAllVideos();
    }

    return NextResponse.json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = videoCreateSchema.parse(body) as VideoCreateSchema;

    const { license, ...videoData } = validatedData;
    const video = await VideoContentService.createVideo(videoData, license);

    return NextResponse.json(video, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid video data', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Error creating video:', error);
    return NextResponse.json(
      { error: 'Failed to create video' },
      { status: 500 }
    );
  }
} 