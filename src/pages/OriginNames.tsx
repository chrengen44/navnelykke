
import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NameGrid from "@/components/NameGrid";
import AdvancedNameFilters from "@/components/search/AdvancedNameFilters";
import { AdvancedFilterState } from "@/components/search/filters/types";
import AdSpace from "@/components/AdSpace";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Globe } from "lucide-react";
import { BabyName } from "@/data/types";

const OriginNames = () => {
  const { origin } = useParams<{ origin: string }>();
  const [filters, setFilters] = useState<AdvancedFilterState>({
    gender: "all",
    length: "all",
    letter: "",
    search: "",
    meaning: "",
    origin: "",
    popularity: [0, 100],
    excludeLetters: "",
    excludeTopPopular: false
  });

  const { data: names, isLoading } = useQuery({
    queryKey: ['names', 'origin', origin, filters],
    queryFn: async () => {
      let query = supabase
        .from('baby_names')
        .select(`
          id,
          name,
          gender,
          origin,
          meaning,
          popularity,
          length,
          first_letter,
          name_category_mappings(
            name_categories(name)
          )
        `)
        .eq('origin', origin);

      if (filters.gender !== "all") {
        query = query.eq('gender', filters.gender);
      }
      
      if (filters.length !== "all") {
        query = query.eq('length', filters.length);
      }
      
      if (filters.letter) {
        query = query.eq('first_letter', filters.letter.toUpperCase());
      }

      if (filters.search) {
        query = query.ilike('name', `%${filters.search}%`);
      }

      if (filters.meaning) {
        query = query.ilike('meaning', `%${filters.meaning}%`);
      }

      if (filters.excludeLetters) {
        const excludedLetters = filters.excludeLetters
          .split(",")
          .map(letter => letter.trim().toUpperCase());
        query = query.not('first_letter', 'in', `(${excludedLetters.join(',')})`);
      }

      if (filters.excludeTopPopular) {
        query = query.gt('popularity', 10);
      }

      const { data, error } = await query;
      if (error) throw error;

      return data.map((name: any): BabyName => ({
        id: name.id,
        name: name.name,
        gender: name.gender,
        origin: name.origin,
        meaning: name.meaning,
        popularity: name.popularity,
        length: name.length,
        firstLetter: name.first_letter,
        categories: name.name_category_mappings.map(
          (mapping: any) => mapping.name_categories.name
        )
      }));
    }
  });

  const handleFilter = (newFilters: AdvancedFilterState) => {
    setFilters(newFilters);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-gradient-to-br from-babyblue via-white to-babypink py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-sm">
                  <Globe className="w-8 h-8 text-gray-800" />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{origin}</h1>
              <p className="text-lg text-gray-700">
                Utforsk navn med opprinnelse fra {origin}
              </p>
            </div>
          </div>
        </div>
        
        <section className="py-8">
          <div className="container mx-auto px-4">
            <AdvancedNameFilters onFilter={handleFilter} />
            
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
              </div>
            ) : (
              <NameGrid 
                names={names || []} 
                showDetails={true}
                emptyMessage="Ingen navn funnet med disse filtrene. Prøv å justere søkekriteriene."
              />
            )}
            
            <div className="mt-8">
              <AdSpace type="horizontal" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OriginNames;
