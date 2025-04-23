
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NameGrid from '@/components/NameGrid';
import AdvancedNameFilters from '@/components/search/AdvancedNameFilters';
import { AdvancedFilterState } from '@/components/search/filters/types';
import { getPopularNames, BabyName } from '@/data';
import { babyNames } from '@/data/namesData';

const PopularNames = () => {
  const [searchParams] = useSearchParams();
  const [names, setNames] = useState<BabyName[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<AdvancedFilterState>({
    gender: (searchParams.get('gender') || 'all') as "boy" | "girl" | "unisex" | "all",
    length: (searchParams.get('length') || 'all') as "short" | "medium" | "long" | "all",
    letter: searchParams.get('letter') || '',
    search: searchParams.get('search') || '',
    meaning: '',
    origin: '',
    popularity: [0, 100],
    excludeLetters: '',
    excludeTopPopular: false
  });

  useEffect(() => {
    const fetchNames = async () => {
      setLoading(true);
      try {
        let popularNames = await getPopularNames(undefined, 100);
        
        if (!popularNames || popularNames.length === 0) {
          popularNames = [...babyNames];
        }
        
        // Apply filters
        let filteredNames = [...popularNames];
        
        if (filters.gender !== 'all') {
          filteredNames = filteredNames.filter(name => name.gender === filters.gender);
        }
        
        if (filters.length !== 'all') {
          filteredNames = filteredNames.filter(name => name.length === filters.length);
        }
        
        if (filters.letter) {
          filteredNames = filteredNames.filter(name => 
            name.firstLetter.toLowerCase() === filters.letter.toLowerCase()
          );
        }
        
        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          filteredNames = filteredNames.filter(name => 
            name.name.toLowerCase().includes(searchLower) ||
            name.meaning.toLowerCase().includes(searchLower) ||
            name.origin.toLowerCase().includes(searchLower)
          );
        }

        if (filters.meaning) {
          const meaningLower = filters.meaning.toLowerCase();
          filteredNames = filteredNames.filter(name => 
            name.meaning.toLowerCase().includes(meaningLower)
          );
        }
        
        if (filters.origin) {
          const originLower = filters.origin.toLowerCase();
          filteredNames = filteredNames.filter(name => 
            name.origin.toLowerCase().includes(originLower)
          );
        }
        
        if (filters.excludeLetters) {
          const excludedLetters = filters.excludeLetters
            .split(",")
            .map(letter => letter.trim().toLowerCase());
          filteredNames = filteredNames.filter(name => 
            !excludedLetters.includes(name.firstLetter.toLowerCase())
          );
        }
        
        if (filters.excludeTopPopular) {
          filteredNames = filteredNames.filter(name => name.popularity > 10);
        }
        
        setNames(filteredNames);
      } catch (error) {
        console.error("Error fetching popular names:", error);
        setNames([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNames();
  }, [filters]);

  const handleFilter = (newFilters: AdvancedFilterState) => {
    setFilters(newFilters);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Populære navn i Norge</h1>
          <p className="text-gray-600 mb-8">
            Utforsk de mest populære navnene i Norge basert på statistikk fra Statistisk Sentralbyrå.
            Bruk filtrene nedenfor for å finne det perfekte navnet.
          </p>
          
          <AdvancedNameFilters 
            onFilter={handleFilter}
            initialFilters={filters}
          />
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
            </div>
          ) : (
            <div className="mt-8">
              <NameGrid 
                names={names} 
                emptyMessage="Ingen navn funnet med disse filtrene. Prøv å justere filtrene for å se flere resultater."
                showDetails={true}
              />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PopularNames;
