
import React from "react";
import "../index.css";
import ConsentBannerWrapper from "@/components/ConsentBannerWrapper";
import AdSenseScript from "@/components/AdSenseScript";
import SecurityHeaders from "@/components/SecurityHeaders";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Set default metadata
  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    
    // Set default title if not already set
    if (!document.title) {
      document.title = "Navnelykke";
    }
    
    // Set default description if not already set
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', "Finn det perfekte navnet til din baby");
      document.head.appendChild(metaDescription);
    }
  }, []);
  
  return (
    <html lang="no" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Navnelykke</title>
        <meta name="description" content="Finn det perfekte navnet til din baby" />
      </head>
      <body>
        <SecurityHeaders />
        <div>
          {children}
          <ConsentBannerWrapper />
          <AdSenseScript />
        </div>
      </body>
    </html>
  );
}
