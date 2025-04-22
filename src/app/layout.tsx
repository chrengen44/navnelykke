import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ConsentBanner from "@/components/ConsentBanner";

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
  return (
    <html lang="no" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-3372507393637890" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <div className="fixed bottom-0 left-0 right-0 z-50">
            <ConsentBanner />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
} 