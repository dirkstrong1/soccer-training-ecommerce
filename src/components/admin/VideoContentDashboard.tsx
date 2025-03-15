'use client';

import { useState, useEffect } from 'react';
import { VideoContentService } from '@/services/videoContentService';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Video {
  id: string;
  title: string;
  creator: string;
  duration: string;
  license: {
    type: string;
    expirationDate: string | null;
    territoryRestrictions: string[];
  } | null;
}

export function VideoContentDashboard() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'expired' | 'expiring-soon'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, [filter]);

  const transformVideo = (video: any): Video => ({
    id: video.id,
    title: video.title,
    creator: video.creator,
    duration: video.duration,
    license: video.license ? {
      type: video.license.type,
      expirationDate: video.license.expirationDate?.toISOString() || null,
      territoryRestrictions: video.license.territoryRestrictions,
    } : null,
  });

  const fetchVideos = async () => {
    try {
      setIsLoading(true);
      let fetchedVideos;
      if (filter === 'all') {
        fetchedVideos = await VideoContentService.getAllVideos();
      } else {
        fetchedVideos = await VideoContentService.getVideosByLicenseStatus(filter);
      }
      setVideos(fetchedVideos.map(transformVideo));
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      try {
        await VideoContentService.deleteVideo(id);
        fetchVideos();
      } catch (error) {
        console.error('Error deleting video:', error);
      }
    }
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">All Videos</option>
            <option value="active">Active Licenses</option>
            <option value="expired">Expired Licenses</option>
            <option value="expiring-soon">Expiring Soon</option>
          </select>
        </div>
        <button
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Video
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {videos.map((video) => (
              <li key={video.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900">{video.title}</h3>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <span>By {video.creator}</span>
                      <span className="mx-2">&bull;</span>
                      <span>{video.duration}</span>
                    </div>
                    {video.license && (
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                          {video.license.type}
                        </span>
                        {video.license.expirationDate && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Expires: {new Date(video.license.expirationDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      className="text-gray-400 hover:text-gray-500"
                      title="Edit"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(video.id)}
                      className="text-red-400 hover:text-red-500"
                      title="Delete"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 