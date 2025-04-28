
import React from "react";
import "../index.css";
import ConsentBannerWrapper from "@/components/ConsentBannerWrapper";
import AdSenseScript from "@/components/AdSenseScript";
import StructuredData from "@/components/SEO/StructuredData";
import { useStructuredData } from "@/hooks/useStructuredData";
import { HelmetProvider } from "react-helmet-async";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { getWebsiteData } = useStructuredData();
  const websiteData = getWebsiteData();

  return (
    <html lang="no" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Navnelykke</title>
        <meta name="description" content="Finn det perfekte navnet til din baby" />
      </head>
      <body>
        <HelmetProvider>
          <div>
            <StructuredData data={websiteData} />
            {children}
            <ConsentBannerWrapper />
            <AdSenseScript />
          </div>
        </HelmetProvider>
      </body>
    </html>
  );
}
