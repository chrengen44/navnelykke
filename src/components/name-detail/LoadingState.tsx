
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const LoadingState = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </main>
      <Footer />
    </div>
  );
};
