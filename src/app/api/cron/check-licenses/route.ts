import { NextResponse } from 'next/server';
import { NotificationService } from '@/services/notificationService';

// This route should be called by a cron job service (e.g., Vercel Cron Jobs)
export async function GET(request: Request) {
  try {
    // Verify the request is from our cron service
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET_KEY}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check for licenses expiring in the next 30 days
    const notificationsCreated = await NotificationService.checkExpiringLicenses(30);

    return NextResponse.json({
      success: true,
      notificationsCreated,
      message: `Created ${notificationsCreated} notifications for expiring licenses`,
    });
  } catch (error) {
    console.error('Error checking licenses:', error);
    return NextResponse.json(
      { error: 'Failed to check licenses' },
      { status: 500 }
    );
  }
} 