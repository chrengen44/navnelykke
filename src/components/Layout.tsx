
import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <Toaster position="top-right" richColors />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
};
