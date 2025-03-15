import React from 'react';

interface LegalDisclaimerProps {
  className?: string;
}

const LegalDisclaimer: React.FC<LegalDisclaimerProps> = ({ className = '' }) => {
  return (
    <div className={`text-sm text-gray-500 ${className}`}>
      <h4 className="font-semibold mb-2">Video Content Usage Terms</h4>
      <div className="space-y-2">
        <p>
          All video content provided in this program is protected by copyright and other intellectual property rights. 
          By accessing these videos, you agree to:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Use the content for personal training purposes only</li>
          <li>Not download, copy, or redistribute the videos</li>
          <li>Not modify or create derivative works</li>
          <li>Respect creator attributions and licenses</li>
        </ul>
        <p className="text-xs mt-4">
          © {new Date().getFullYear()} Soccer Training Program. All rights reserved. 
          Videos are provided under specific licenses and partnerships with content creators.
        </p>
      </div>
    </div>
  );
};

export default LegalDisclaimer; 