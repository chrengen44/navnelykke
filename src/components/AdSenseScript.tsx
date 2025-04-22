'use client';

import Script from 'next/script';

const AdSenseScript = () => {
  return (
    <Script
      id="adsense-script"
      strategy="afterInteractive"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3372507393637890"
      crossOrigin="anonymous"
      onLoad={() => {
        console.log('AdSense script loaded successfully');
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }}
      onError={(e) => {
        console.error('AdSense script failed to load:', e);
      }}
    />
  );
};

export default AdSenseScript; 