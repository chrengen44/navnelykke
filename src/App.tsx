
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Categories from "./pages/Categories";
import Category from "./pages/Category";
import PopularNames from "./pages/PopularNames";
import NameDetail from "./pages/NameDetail";
import Search from "./pages/Search";
import Inspiration from "./pages/Inspiration";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/kategorier" element={<Categories />} />
          <Route path="/kategori/:categoryId" element={<Category />} />
          <Route path="/populaere" element={<PopularNames />} />
          <Route path="/navn/:nameId" element={<NameDetail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/inspirasjon" element={<Inspiration />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
