import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ConsentBannerWrapper from "@/components/ConsentBannerWrapper";
import AdSenseScript from "@/components/AdSenseScript";

console.log('Loading RootLayout');

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Navnelykke",
  description: "Finn det perfekte navnet til din baby",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log('RootLayout rendered');
  return (
    <html lang="no" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <ConsentBannerWrapper />
          <AdSenseScript />
        </ThemeProvider>
      </body>
    </html>
  );
} 