import React, { useState } from 'react';
import { VideoContent, VideoLicense } from '@/types/program';

interface VideoContentManagerProps {
  videos: VideoContent[];
  onVideoUpdate: (video: VideoContent) => void;
  onVideoDelete: (videoId: string) => void;
  className?: string;
}

const VideoContentManager: React.FC<VideoContentManagerProps> = ({
  videos,
  onVideoUpdate,
  onVideoDelete,
  className = ''
}) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoContent | null>(null);

  const getLicenseStatus = (license: VideoLicense): 'active' | 'expired' | 'expiring-soon' => {
    const now = new Date();
    const expirationDate = license.expirationDate ? new Date(license.expirationDate) : null;
    
    if (!expirationDate) return 'active';
    
    if (expirationDate < now) {
      return 'expired';
    }

    // Check if license expires within 30 days
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    
    if (expirationDate < thirtyDaysFromNow) {
      return 'expiring-soon';
    }

    return 'active';
  };

  const getLicenseStatusColor = (status: ReturnType<typeof getLicenseStatus>) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50';
      case 'expired':
        return 'text-red-600 bg-red-50';
      case 'expiring-soon':
        return 'text-yellow-600 bg-yellow-50';
    }
  };

  const hasRestrictions = (video: VideoContent): boolean => {
    const restrictions = video.license.territoryRestrictions;
    return Boolean(restrictions && restrictions.length > 0);
  };

  return (
    <div className={`video-content-manager ${className}`}>
      <h2 className="text-2xl font-bold mb-6">Video Content Management</h2>
      
      <div className="space-y-6">
        {/* Video List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium mb-4">Content Library</h3>
            <div className="divide-y divide-gray-200">
              {videos.map((video) => {
                const licenseStatus = getLicenseStatus(video.license);
                return (
                  <div key={video.id} className="py-4">
                    <div className="flex items-start justify-between">
                      <div className="min-w-0 flex-1">
                        <h4 className="text-base font-medium">{video.title}</h4>
                        <p className="text-sm text-gray-500">
                          By {video.creator} • {video.duration}
                        </p>
                        <div className="mt-1 flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLicenseStatusColor(licenseStatus)}`}>
                            {licenseStatus === 'active' && 'Active License'}
                            {licenseStatus === 'expired' && 'License Expired'}
                            {licenseStatus === 'expiring-soon' && 'License Expiring Soon'}
                          </span>
                          <span className="text-xs text-gray-500">
                            {video.license.type}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <button
                          onClick={() => setSelectedVideo(video)}
                          className="text-sm text-blue-600 hover:text-blue-500"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onVideoDelete(video.id)}
                          className="ml-4 text-sm text-red-600 hover:text-red-500"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    {video.license.restrictions && video.license.restrictions.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-500">
                          Restrictions: {video.license.restrictions.join(', ')}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* License Warnings */}
        <div className="bg-yellow-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-yellow-800 mb-2">License Alerts</h4>
          <ul className="list-disc pl-5 space-y-1">
            {videos
              .filter(video => getLicenseStatus(video.license) !== 'active')
              .map(video => (
                <li key={video.id} className="text-sm text-yellow-700">
                  {video.title} - {getLicenseStatus(video.license) === 'expired' 
                    ? 'License has expired' 
                    : 'License expiring soon'}
                </li>
              ))}
          </ul>
        </div>

        {/* Territory Restrictions */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-800 mb-2">Territory Restrictions</h4>
          <ul className="list-disc pl-5 space-y-1">
            {videos
              .filter(hasRestrictions)
              .map(video => {
                const restrictions = video.license.territoryRestrictions;
                return (
                  <li key={video.id} className="text-sm text-blue-700">
                    {video.title} - Not available in: {restrictions?.join(', ')}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VideoContentManager; 