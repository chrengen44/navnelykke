
import React, { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

const AdSenseScript = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const script = document.createElement("script");
        script.async = true;
        script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX";
        script.crossOrigin = "anonymous";
        document.head.appendChild(script);
        
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error("AdSense script error:", error);
      }
    }
  }, []);

  return null;
};

export default AdSenseScript;
