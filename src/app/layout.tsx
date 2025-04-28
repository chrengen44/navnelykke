
import React from "react";
import "../index.css";
import ConsentBannerWrapper from "@/components/ConsentBannerWrapper";
import AdSenseScript from "@/components/AdSenseScript";
import { HelmetProvider } from "react-helmet-async";
import SecurityHeaders from "@/components/SecurityHeaders";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Properly initialize the helmetContext object with required shape
  const helmetContext = {
    helmet: {
      base: { toComponent: () => [], toString: () => '' },
      bodyAttributes: { toComponent: () => [], toString: () => '' },
      htmlAttributes: { toComponent: () => [], toString: () => '' },
      link: { toComponent: () => [], toString: () => '' },
      meta: { toComponent: () => [], toString: () => '' },
      noscript: { toComponent: () => [], toString: () => '' },
      script: { toComponent: () => [], toString: () => '' },
      style: { toComponent: () => [], toString: () => '' },
      title: { toComponent: () => [], toString: () => '' },
    }
  };

  return (
    <html lang="no" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Navnelykke</title>
        <meta name="description" content="Finn det perfekte navnet til din baby" />
      </head>
      <body>
        <HelmetProvider context={helmetContext}>
          <SecurityHeaders />
          <div>
            {children}
            <ConsentBannerWrapper />
            <AdSenseScript />
          </div>
        </HelmetProvider>
      </body>
    </html>
  );
}
