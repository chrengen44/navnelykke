
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import SecurityHeaders from "@/components/SecurityHeaders";

// Eager-load critical components
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/hooks/useAuth";

// Lazy-loaded components for code splitting
const Index = lazy(() => import("@/pages/index"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Categories = lazy(() => import("@/pages/Categories"));
const Category = lazy(() => import("@/pages/Category"));
const PopularNames = lazy(() => import("@/pages/PopularNames"));
const NameDetail = lazy(() => import("@/pages/NameDetail"));
const Search = lazy(() => import("@/pages/Search"));
const Inspiration = lazy(() => import("@/pages/Inspiration"));
const Profile = lazy(() => import("@/pages/Profile"));
const Favorites = lazy(() => import("@/pages/Favorites"));
const SuggestName = lazy(() => import("@/pages/SuggestName"));
const Admin = lazy(() => import("@/pages/Admin"));
const NameTrends = lazy(() => import("@/pages/NameTrends"));
const OriginNames = lazy(() => import("@/pages/OriginNames"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const PrivacyPolicy = lazy(() => import("@/components/PrivacyPolicy"));
const NameTrendTest = lazy(() => import('@/components/NameTrendTest'));
const Tools = lazy(() => import('@/pages/Tools'));
const CulturalNames = lazy(() => import('@/pages/CulturalNames'));
const CreatePoll = lazy(() => import('@/pages/CreatePoll'));
const EditPoll = lazy(() => import('@/pages/EditPoll'));
const ViewPoll = lazy(() => import('@/pages/ViewPoll'));
const Auth = lazy(() => import('@/pages/Auth'));
const SecuritySettings = lazy(() => import('@/pages/SecuritySettings'));
const NameLists = lazy(() => import('@/pages/NameLists'));
const NameListDetail = lazy(() => import('@/pages/NameListDetail'));
const NameSelectionTips = lazy(() => import('@/pages/NameSelectionTips'));
const NameTraditionsArticle = lazy(() => import('@/pages/NameTraditionsArticle'));
const NordicNames = lazy(() => import('@/pages/NordicNames'));
const NameCombinationsArticle = lazy(() => import('@/pages/NameCombinationsArticle'));
const InternationalNames = lazy(() => import('@/pages/InternationalNames'));
const SiblingNames = lazy(() => import('@/pages/SiblingNames'));
const DigitalNamingArticle = lazy(() => import('@/pages/DigitalNamingArticle'));

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center w-full h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export default function AppRouter() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <FavoritesProvider>
            <SecurityHeaders />
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Suspense fallback={<PageLoader />}>
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
                  <Route path="/artikkel/søskennavn" element={<SiblingNames />} />
                  <Route path="/artikkel/navngiving-digital" element={<DigitalNamingArticle />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </FavoritesProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
