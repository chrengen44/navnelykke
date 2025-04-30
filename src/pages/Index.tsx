
import React, { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import Hero from "@/components/Hero";
import { getPopularNames, getNamesByCategory } from "@/data";
import AdSpace from "@/components/AdSpace";
import { BabyName } from "@/data/types";
import { toast } from "sonner";

// Import section components
import ToolsSection from "@/components/sections/ToolsSection";
import NameOfTheDaySection from "@/components/sections/NameOfTheDaySection";
import CategoriesSection from "@/components/sections/CategoriesSection";
import FeaturedNamesSection from "@/components/sections/FeaturedNamesSection";
import NameTipsSection from "@/components/sections/NameTipsSection";

const Index: React.FC = () => {
  const [popularBoyNames, setPopularBoyNames] = useState<BabyName[]>([]);
  const [popularGirlNames, setPopularGirlNames] = useState<BabyName[]>([]);
  const [vikingNames, setVikingNames] = useState<BabyName[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Use Promise.allSettled to handle partial failures
        const results = await Promise.allSettled([
          getPopularNames("boy", 4),
          getPopularNames("girl", 4),
          getNamesByCategory("vikingnavn", 4)
        ]);
        
        // Process boy names result
        if (results[0].status === 'fulfilled') {
          setPopularBoyNames(results[0].value || []);
        } else {
          console.error("Error fetching boy names:", results[0].reason);
          setPopularBoyNames([]);
        }
        
        // Process girl names result
        if (results[1].status === 'fulfilled') {
          setPopularGirlNames(results[1].value || []);
        } else {
          console.error("Error fetching girl names:", results[1].reason);
          setPopularGirlNames([]);
        }
        
        // Process viking names result
        if (results[2].status === 'fulfilled') {
          setVikingNames(results[2].value || []);
        } else {
          console.error("Error fetching viking names:", results[2].reason);
          setVikingNames([]);
        }
        
        // Check if all promises were rejected
        const allFailed = results.every(result => result.status === 'rejected');
        if (allFailed) {
          setError("Kunne ikke laste inn noen navn. Vennligst prøv igjen senere.");
          try {
            toast.error("Kunne ikke laste inn noen navn. Vennligst prøv igjen senere.");
          } catch (toastError) {
            console.error("Toast error:", toastError);
          }
        }
      } catch (error) {
        console.error("Error fetching data for homepage:", error);
        setError("Noe gikk galt. Vennligst prøv igjen senere.");
        try {
          toast.error("Kunne ikke laste inn alle navn. Noen data kan mangle.");
        } catch (toastError) {
          console.error("Toast error:", toastError);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  return (
    <Layout>
      <Hero />
      <ToolsSection />
      <NameOfTheDaySection />
      <CategoriesSection />
      
      {/* Ad Space */}
      <div className="container mx-auto px-4 py-4">
        <AdSpace type="horizontal" />
      </div>
      
      {error ? (
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <p className="text-red-700">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-md transition-colors"
            >
              Last inn på nytt
            </button>
          </div>
        </div>
      ) : (
        <FeaturedNamesSection
          popularBoyNames={popularBoyNames}
          popularGirlNames={popularGirlNames}
          vikingNames={vikingNames}
          loading={loading}
        />
      )}
      
      <NameTipsSection />
    </Layout>
  );
};

export default Index;
