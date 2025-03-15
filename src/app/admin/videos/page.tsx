import { VideoContentDashboard } from '@/components/admin/VideoContentDashboard';
import { NotificationBell } from '@/components/admin/NotificationBell';

export default function VideoManagementPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Video Content Management</h1>
            <NotificationBell />
          </div>
          <VideoContentDashboard />
        </div>
      </div>
    </div>
  );
} 