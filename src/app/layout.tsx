
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
  // Create a properly initialized helmetContext object with a default empty arrays
  // This is critical for react-helmet-async to work correctly
  const helmetContext = {
    helmet: {
      base: { toComponent: () => null, toString: () => '' },
      bodyAttributes: { toComponent: () => null, toString: () => '' },
      htmlAttributes: { toComponent: () => null, toString: () => '' },
      link: { toComponent: () => null, toString: () => '' },
      meta: { toComponent: () => null, toString: () => '' },
      noscript: { toComponent: () => null, toString: () => '' },
      script: { toComponent: () => null, toString: () => '' },
      style: { toComponent: () => null, toString: () => '' },
      title: { toComponent: () => null, toString: () => '' },
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
