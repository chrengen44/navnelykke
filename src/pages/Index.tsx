
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { getPopularNames, getNamesByCategory } from "@/data";
import AdSpace from "@/components/AdSpace";
import { BabyName } from "@/data/types";

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
        const [boyNames, girlNames, viking] = await Promise.all([
          getPopularNames("boy", 4),
          getPopularNames("girl", 4),
          getNamesByCategory("vikingnavn", 4)
        ]);
        
        setPopularBoyNames(boyNames);
        setPopularGirlNames(girlNames);
        setVikingNames(viking);
      } catch (error) {
        console.error("Error fetching data for homepage:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
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
      </main>
      <Footer />
    </div>
  );
};

export default Index;
