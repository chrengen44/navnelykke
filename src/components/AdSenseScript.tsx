
import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

const AdSenseScript = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, []);

  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
};

export default AdSenseScript;
