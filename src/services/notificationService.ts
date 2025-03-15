import { VideoContentService } from './videoContentService';
import { prisma } from '@/lib/prisma';

export class NotificationService {
  // Check for expiring licenses and create notifications
  static async checkExpiringLicenses(daysThreshold: number = 30) {
    const expiringLicenses = await VideoContentService.getExpiringLicenses(daysThreshold);
    
    for (const license of expiringLicenses) {
      await prisma.notification.create({
        data: {
          type: 'LICENSE_EXPIRING',
          title: `License Expiring: ${license.video.title}`,
          message: `The license for video "${license.video.title}" will expire on ${license.expirationDate?.toLocaleDateString()}. Please review and take necessary action.`,
          status: 'UNREAD',
          metadata: {
            videoId: license.video.id,
            licenseId: license.id,
            expirationDate: license.expirationDate,
          },
        },
      });
    }

    return expiringLicenses.length;
  }

  // Get all notifications
  static async getNotifications(status?: 'READ' | 'UNREAD') {
    return prisma.notification.findMany({
      where: status ? { status } : undefined,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // Mark notification as read
  static async markAsRead(notificationId: string) {
    return prisma.notification.update({
      where: { id: notificationId },
      data: { status: 'READ' },
    });
  }

  // Delete notification
  static async deleteNotification(notificationId: string) {
    return prisma.notification.delete({
      where: { id: notificationId },
    });
  }

  // Get unread notification count
  static async getUnreadCount() {
    return prisma.notification.count({
      where: { status: 'UNREAD' },
    });
  }
} 