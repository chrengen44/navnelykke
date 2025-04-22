
import React, { useEffect } from "react";

// Extend the Window interface to include adsbygoogle
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdSenseScript = () => {
  // Only show ads if consent is given
  const canShowAds =
    typeof window !== "undefined" && localStorage.getItem("consent") === "true";

  useEffect(() => {
    if (canShowAds) {
      // Create and append the script dynamically
      const script = document.createElement("script");
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3372507393637890";
      script.async = true;
      script.crossOrigin = "anonymous";
      script.id = "adsense-script";
      script.onload = () => {
        if (window.adsbygoogle) {
          window.adsbygoogle.push({});
        }
      };
      document.head.appendChild(script);

      // Clean up function
      return () => {
        if (document.getElementById("adsense-script")) {
          document.head.removeChild(script);
        }
      };
    }
  }, [canShowAds]);

  return null;
};

export default AdSenseScript;
