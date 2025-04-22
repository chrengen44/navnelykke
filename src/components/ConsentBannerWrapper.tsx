'use client';

import dynamic from 'next/dynamic';

const ConsentBanner = dynamic(() => import('./ConsentBanner'), {
  ssr: false,
});

const ConsentBannerWrapper = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <ConsentBanner />
    </div>
  );
};

export default ConsentBannerWrapper; 