import React from 'react';
import { Drill } from '@/types/program';
import LegalDisclaimer from './LegalDisclaimer';

interface DrillVideoProps {
  drill: Drill;
  className?: string;
}

const DrillVideo: React.FC<DrillVideoProps> = ({ drill, className = '' }) => {
  if (!drill.video) return null;

  // Check if video license is valid
  const isLicenseValid = (video: NonNullable<Drill['video']>) => {
    const now = new Date();
    const expirationDate = video.license.expirationDate ? new Date(video.license.expirationDate) : null;
    
    // Check if license is expired
    if (expirationDate && expirationDate < now) {
      return false;
    }

    // Check for territory restrictions
    const userCountry = 'US'; // This should come from user's location
    const restrictions = video.license.territoryRestrictions;
    if (restrictions && restrictions.length > 0 && restrictions.includes(userCountry)) {
      return false;
    }

    return true;
  };

  const getEmbedUrl = (url: string): string => {
    const videoId = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/)?.[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  if (!isLicenseValid(drill.video)) {
    return (
      <div className={`drill-video ${className}`}>
        <div className="bg-gray-100 rounded-lg p-4 text-center">
          <p className="text-gray-600">This video is currently unavailable in your region or the license has expired.</p>
        </div>
      </div>
    );
  }

  const embedUrl = getEmbedUrl(drill.video.url);

  return (
    <div className={`drill-video ${className}`}>
      <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
        <iframe
          src={embedUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
      <div className="mt-3">
        <h4 className="text-lg font-semibold">{drill.video.title}</h4>
        <p className="text-sm text-gray-600">{drill.description}</p>
        <div className="mt-2 text-sm">
          <span className="text-gray-500">Duration: {drill.duration}</span>
          <p className="text-gray-400 text-xs mt-1">{drill.video.attribution}</p>
        </div>
        {drill.video.license.type === 'creative-commons' && (
          <p className="text-xs text-gray-400 mt-1">
            Licensed under Creative Commons. See terms for attribution requirements.
          </p>
        )}
      </div>
      <LegalDisclaimer className="mt-4 p-4 bg-gray-50 rounded-lg" />
    </div>
  );
};

export default DrillVideo; 