
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { nameCategories, getPopularNames, getNamesByCategory } from "@/data";
import FeaturedSection from "@/components/FeaturedSection";
import CategoryCard from "@/components/CategoryCard";
import AdSpace from "@/components/AdSpace";
import { BabyName } from "@/data/types";

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
        
        {/* Categories */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Utforsk etter kategorier</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Finn inspirasjon fra ulike typer navn og tradisjoner
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {nameCategories.map((category) => (
                <CategoryCard
                  key={category.id}
                  id={category.id}
                  title={category.title}
                  description={category.description}
                  icon={category.icon}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Ad Space */}
        <div className="container mx-auto px-4 py-4">
          <AdSpace type="horizontal" />
        </div>
        
        {loading ? (
          <div className="container mx-auto px-4 py-12 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
          </div>
        ) : (
          <>
            {/* Featured Names for Boys */}
            <FeaturedSection
              title="Populære guttenavn"
              description="Utforsk de mest populære guttenavnene i Norge akkurat nå"
              names={popularBoyNames}
              linkTo="/populaere?gender=boy"
              backgroundClass="bg-babyblue/30"
            />
            
            {/* Featured Names for Girls */}
            <FeaturedSection
              title="Populære jentenavn"
              description="Utforsk de mest populære jentenavnene i Norge akkurat nå"
              names={popularGirlNames}
              linkTo="/populaere?gender=girl"
              backgroundClass="bg-babypink/30"
            />
            
            {/* Featured Viking Names */}
            <FeaturedSection
              title="Vikingnavn med historie"
              description="Sterke og tradisjonelle nordiske navn fra vikingtiden"
              names={vikingNames}
              linkTo="/kategori/vikingnavn"
              backgroundClass="bg-babypeach/30"
            />
          </>
        )}
        
        {/* Name Tips */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="mb-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Tips for å velge det perfekte navnet</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Noen råd til foreldre som leter etter det ideelle navnet til sitt barn
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Tenk på uttale og stavelse</h3>
                <p className="text-gray-600">
                  Vurder hvor enkelt navnet er å uttale og stave. Et navn som ofte mistolkes kan bli frustrerende for barnet.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Utforsk betydningen</h3>
                <p className="text-gray-600">
                  Mange navn har spesielle betydninger eller historie bak seg. Et navn med en vakker eller meningsfull betydning kan være en fin gave.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Test navnet</h3>
                <p className="text-gray-600">
                  Si navnet høyt. Hvordan høres det ut med etternavnet? Kan det forkortes til kallenavn? Tenk på hvordan det vil passe i ulike livsfaser.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
