
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Categories from "./pages/Categories";
import Category from "./pages/Category";
import PopularNames from "./pages/PopularNames";
import NameDetail from "./pages/NameDetail";
import Search from "./pages/Search";
import Inspiration from "./pages/Inspiration";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import SuggestName from "./pages/SuggestName";
import Admin from "./pages/Admin";
import NameTrends from "./pages/NameTrends";
import OriginNames from "./pages/OriginNames";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./components/PrivacyPolicy";
import NameTrendTest from './components/NameTrendTest';
import Tools from './pages/Tools';
import CulturalNames from './pages/CulturalNames';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <FavoritesProvider>
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
              <Route path="/opprinnelse/:origin" element={<OriginNames />} />
              <Route path="/om-navnelykke" element={<About />} />
              <Route path="/kontakt-oss" element={<Contact />} />
              <Route path="/personvern" element={<PrivacyPolicy />} />
              <Route path="/test" element={<NameTrendTest />} />
              <Route path="/verktoy" element={<Tools />} />
              <Route path="/kulturelle-navn" element={<CulturalNames />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </FavoritesProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
