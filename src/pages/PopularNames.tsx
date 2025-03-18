
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NameGrid from '@/components/NameGrid';
import NameFilters from '@/components/NameFilters';
import { getPopularNames, BabyName } from '@/data/names';

const PopularNames = () => {
  const [searchParams] = useSearchParams();
  const [names, setNames] = useState<BabyName[]>([]);
  const [filters, setFilters] = useState({
    gender: searchParams.get('gender') || 'all',
    length: searchParams.get('length') || 'all',
    letter: searchParams.get('letter') || 'all',
    search: searchParams.get('search') || '',
  });

  useEffect(() => {
    let popularNames = getPopularNames(undefined, 100);
    
    // Apply filters
    let filteredNames = [...popularNames];
    
    if (filters.gender !== 'all') {
      // Use type assertion to handle the "all" case that doesn't overlap with BabyName gender types
      filteredNames = filteredNames.filter(name => name.gender === (filters.gender as "boy" | "girl" | "unisex"));
    }
    
    if (filters.length !== 'all') {
      filteredNames = filteredNames.filter(name => name.length === filters.length);
    }
    
    if (filters.letter !== 'all') {
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
    
    setNames(filteredNames);
  }, [filters]);

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
          
          <NameFilters 
            filters={filters} 
            setFilters={setFilters} 
            showCategoryFilter={false}
          />
          
          <div className="mt-8">
            <NameGrid 
              names={names} 
              emptyMessage="Ingen navn funnet med disse filtrene. Prøv å justere filtrene for å se flere resultater."
              showDetails={true}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PopularNames;
