
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Categories from "./pages/Categories";
import Category from "./pages/Category";
import PopularNames from "./pages/PopularNames";
import NameDetail from "./pages/NameDetail";
import Search from "./pages/Search";
import Inspiration from "./pages/Inspiration";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import SuggestName from "./pages/SuggestName";
import Admin from "./pages/Admin";
import NameTrends from "./pages/NameTrends";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/navn/:id" element={<NameDetail />} />
              <Route path="/populære-navn" element={<PopularNames />} />
              <Route path="/navnetrender" element={<NameTrends />} />
              <Route path="/kategorier" element={<Categories />} />
              <Route path="/kategori/:categoryId" element={<Category />} />
              <Route path="/favoritter" element={<Favorites />} />
              <Route path="/inspirasjon" element={<Inspiration />} />
              <Route path="/søk" element={<Search />} />
              <Route path="/foresla-navn" element={<SuggestName />} />
              <Route path="/profil" element={<Profile />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/auth/:action" element={<Auth />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
