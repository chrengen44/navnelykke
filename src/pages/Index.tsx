
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
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Use Promise.allSettled to handle partial failures
        const results = await Promise.allSettled([
          getPopularNames("boy", 4),
          getPopularNames("girl", 4),
          getNamesByCategory("vikingnavn", 4)
        ]);
        
        if (results[0].status === 'fulfilled') {
          setPopularBoyNames(results[0].value);
        } else {
          console.error("Error fetching boy names:", results[0].reason);
          setPopularBoyNames([]);
        }
        
        if (results[1].status === 'fulfilled') {
          setPopularGirlNames(results[1].value);
        } else {
          console.error("Error fetching girl names:", results[1].reason);
          setPopularGirlNames([]);
        }
        
        if (results[2].status === 'fulfilled') {
          setVikingNames(results[2].value);
        } else {
          console.error("Error fetching viking names:", results[2].reason);
          setVikingNames([]);
        }
      } catch (error) {
        console.error("Error fetching data for homepage:", error);
        toast.error("Kunne ikke laste inn alle navn. Noen data kan mangle.");
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
      
      <FeaturedNamesSection
        popularBoyNames={popularBoyNames}
        popularGirlNames={popularGirlNames}
        vikingNames={vikingNames}
        loading={loading}
      />
      
      <NameTipsSection />
    </Layout>
  );
};

export default Index;
