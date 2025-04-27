import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import SecurityHeaders from "@/components/SecurityHeaders";
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
import CreatePoll from './pages/CreatePoll';
import EditPoll from './pages/EditPoll';
import ViewPoll from './pages/ViewPoll';
import Auth from './pages/Auth';
import { AuthProvider } from "./hooks/useAuth";
import SecuritySettings from './pages/SecuritySettings';
import NameLists from './pages/NameLists';
import NameListDetail from './pages/NameListDetail';
import NameSelectionTips from './pages/NameSelectionTips';
import NameTraditionsArticle from './pages/NameTraditionsArticle';
import NordicNames from './pages/NordicNames';
import NameCombinationsArticle from './pages/NameCombinationsArticle';
import InternationalNames from './pages/InternationalNames';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <FavoritesProvider>
            <SecurityHeaders />
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
                <Route path="/poll/create" element={<CreatePoll />} />
                <Route path="/poll/:id/edit" element={<EditPoll />} />
                <Route path="/poll/:id" element={<ViewPoll />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/auth/:action" element={<Auth />} />
                <Route path="/sikkerhet" element={<SecuritySettings />} />
                <Route path="/name-lists" element={<NameLists />} />
                <Route path="/name-list/:id" element={<NameListDetail />} />
                <Route path="/artikkel/nordiske-navn" element={<NordicNames />} />
                <Route path="/artikkel/5-tips-for-navnevalg" element={<NameSelectionTips />} />
                <Route path="/artikkel/navnetradisjoner-i-norge" element={<NameTraditionsArticle />} />
                <Route path="/artikkel/navnekombinasjoner" element={<NameCombinationsArticle />} />
                <Route path="/artikkel/internasjonale-navn" element={<InternationalNames />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </FavoritesProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
