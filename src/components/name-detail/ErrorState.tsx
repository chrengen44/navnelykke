
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ErrorStateProps {
  error: string | null;
}

export const ErrorState = ({ error }: ErrorStateProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Navn ikke funnet</h1>
          <p className="mb-6">{error || "Beklager, vi kunne ikke finne navnet du leter etter."}</p>
          <Button asChild>
            <Link to="/populære-navn">Se populære navn</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};
