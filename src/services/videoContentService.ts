import { prisma } from '@/lib/prisma';
import { Prisma, PrismaClient } from '@prisma/client';

type VideoContentInput = Prisma.VideoContentCreateInput;
type VideoLicenseInput = Prisma.VideoLicenseCreateInput;
type VideoContentUpdate = Prisma.VideoContentUpdateInput;
type VideoLicenseUpdate = Prisma.VideoLicenseUpdateInput;

export class VideoContentService {
  // Get all videos with their licenses
  static async getAllVideos() {
    return prisma.videoContent.findMany({
      include: {
        license: true,
      },
    });
  }

  // Get videos by license status
  static async getVideosByLicenseStatus(status: 'active' | 'expired' | 'expiring-soon') {
    const now = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(now.getDate() + 30);

    let whereClause = {};
    
    switch (status) {
      case 'expired':
        whereClause = {
          license: {
            expirationDate: {
              lt: now,
            },
          },
        };
        break;
      case 'expiring-soon':
        whereClause = {
          license: {
            expirationDate: {
              gt: now,
              lt: thirtyDaysFromNow,
            },
          },
        };
        break;
      case 'active':
        whereClause = {
          OR: [
            {
              license: {
                expirationDate: null,
              },
            },
            {
              license: {
                expirationDate: {
                  gt: now,
                },
              },
            },
          ],
        };
        break;
    }

    return prisma.videoContent.findMany({
      where: whereClause,
      include: {
        license: true,
      },
    });
  }

  // Get videos by territory
  static async getVideosByTerritory(countryCode: string) {
    return prisma.videoContent.findMany({
      where: {
        license: {
          territoryRestrictions: {
            none: {
              equals: countryCode,
            },
          },
        },
      },
      include: {
        license: true,
      },
    });
  }

  // Create new video content with license
  static async createVideo(
    videoData: Omit<VideoContentInput, 'license'>,
    licenseData: Omit<VideoLicenseInput, 'video'>
  ) {
    return prisma.videoContent.create({
      data: {
        ...videoData,
        license: {
          create: licenseData,
        },
      },
      include: {
        license: true,
      },
    });
  }

  // Update video content
  static async updateVideo(
    id: string,
    videoData: VideoContentUpdate
  ) {
    return prisma.videoContent.update({
      where: { id },
      data: videoData,
      include: {
        license: true,
      },
    });
  }

  // Update video license
  static async updateLicense(
    id: string,
    licenseData: VideoLicenseUpdate
  ) {
    return prisma.videoLicense.update({
      where: { videoId: id },
      data: licenseData,
    });
  }

  // Delete video content (and associated license)
  static async deleteVideo(id: string) {
    // First delete the license (due to the foreign key constraint)
    await prisma.videoLicense.delete({
      where: { videoId: id },
    });

    // Then delete the video
    return prisma.videoContent.delete({
      where: { id },
    });
  }

  // Get expiring licenses for notification
  static async getExpiringLicenses(daysThreshold: number = 30) {
    const now = new Date();
    const thresholdDate = new Date();
    thresholdDate.setDate(now.getDate() + daysThreshold);

    return prisma.videoLicense.findMany({
      where: {
        expirationDate: {
          gt: now,
          lt: thresholdDate,
        },
      },
      include: {
        video: true,
      },
    });
  }
} 