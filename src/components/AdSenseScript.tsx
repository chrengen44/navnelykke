
// 'use client';

import Script from "next/script";

const AdSenseScript = () => {
  // Only show ads if consent is given
  const canShowAds =
    typeof window !== "undefined" && localStorage.getItem("consent") === "true";

  return (
    <Script
      id="adsense-script"
      strategy="afterInteractive"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3372507393637890"
      crossOrigin="anonymous"
      onLoad={() => {
        if (typeof window !== "undefined" && window.adsbygoogle && canShowAds) {
          window.adsbygoogle.push({});
        }
      }}
    />
  );
};

export default AdSenseScript;
