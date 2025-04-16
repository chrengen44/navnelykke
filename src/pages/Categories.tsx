
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { nameCategories } from "@/data";
import CategoryCard from "@/components/CategoryCard";
import AdSpace from "@/components/AdSpace";
import OriginCategoryCard from "@/components/OriginCategoryCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Origin {
  origin: string;
  name_count: number;
}

const Categories = () => {
  const { data: origins, isLoading } = useQuery({
    queryKey: ['origins'],
    queryFn: async () => {
      // Fetch all distinct origins from baby_names
      const { data: originsData, error: originsError } = await supabase
        .from('baby_names')
        .select('origin')
        .order('origin');

      if (originsError) throw originsError;
      if (!originsData) return [];

      // Count occurrences of each origin and create Origin objects
      const originCounts: Record<string, number> = {};
      for (const row of originsData) {
        if (row.origin) {
          if (!originCounts[row.origin]) {
            originCounts[row.origin] = 0;
          }
          originCounts[row.origin]++;
        }
      }

      // Convert to array of Origin objects
      return Object.entries(originCounts).map(([origin, count]) => ({
        origin,
        name_count: count
      }));
    }
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-gradient-to-br from-babyblue via-white to-babypink py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Navnekategorier</h1>
              <p className="text-lg text-gray-700">
                Utforsk babynavn sortert etter ulike kategorier og typer
              </p>
            </div>
          </div>
        </div>
        
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Kategorier</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
        
        <div className="container mx-auto px-4 py-4">
          <AdSpace type="horizontal" />
        </div>
        
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Opprinnelse</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {isLoading ? (
                <div className="col-span-full text-center py-8">Laster kategorier...</div>
              ) : origins?.map((origin) => (
                <OriginCategoryCard
                  key={origin.origin}
                  origin={origin.origin}
                  count={origin.name_count}
                />
              ))}
            </div>
          </div>
        </section>
        
        <div className="container mx-auto px-4 py-4">
          <AdSpace type="horizontal" />
        </div>
        
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Hvorfor er kategori viktig?</h2>
              <p className="text-gray-600 max-w-3xl">
                Hvilken type navn du velger kan si mye om dine verdier og hva du vil gi videre til ditt barn. Klassiske navn gir en følelse av tidløshet, mens unike navn kan gi barnet en distinkt identitet.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Navnetrender endrer seg</h3>
                <p className="text-gray-600">
                  Navn går inn og ut av moten, akkurat som klær og musikk. Noen foreldre foretrekker populære, moderne navn, mens andre liker mer tidløse klassikere eller unike alternativer.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Kulturarv gjennom navn</h3>
                <p className="text-gray-600">
                  Navn kan reflektere din kulturelle bakgrunn og arv. Nordiske navn har dype røtter i vår historie, mens internasjonale navn kan representere en mer global tilnærming.
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

export default Categories;
