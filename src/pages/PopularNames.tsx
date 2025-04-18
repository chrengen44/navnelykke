
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NameGrid from '@/components/NameGrid';
import NameFilters from '@/components/NameFilters';
import { getPopularNames, BabyName } from '@/data';
import { babyNames } from '@/data/namesData'; // Import the hardcoded names directly

const PopularNames = () => {
  const [searchParams] = useSearchParams();
  const [names, setNames] = useState<BabyName[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    gender: (searchParams.get('gender') || 'all') as "boy" | "girl" | "unisex" | "all",
    length: (searchParams.get('length') || 'all') as "short" | "medium" | "long" | "all",
    letter: searchParams.get('letter') || '',
    search: searchParams.get('search') || '',
  });

  useEffect(() => {
    const fetchNames = async () => {
      setLoading(true);
      try {
        let popularNames = await getPopularNames(undefined, 100);
        
        // If no names returned from database, use hardcoded names
        if (!popularNames || popularNames.length === 0) {
          console.log('No names returned from database, using hardcoded names');
          popularNames = [...babyNames]; // Use hardcoded names as fallback
        }
        
        // Apply filters
        let filteredNames = [...popularNames];
        
        if (filters.gender !== 'all') {
          // Use type assertion to handle the "all" case that doesn't overlap with BabyName gender types
          filteredNames = filteredNames.filter(name => name.gender === (filters.gender as "boy" | "girl" | "unisex"));
        }
        
        if (filters.length !== 'all') {
          filteredNames = filteredNames.filter(name => name.length === filters.length);
        }
        
        if (filters.letter !== '' && filters.letter !== 'all') {
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
      } catch (error) {
        console.error("Error fetching popular names:", error);
        // On error, use hardcoded names as fallback
        let filteredNames = [...babyNames];
        
        // Apply the same filters to hardcoded names
        if (filters.gender !== 'all') {
          filteredNames = filteredNames.filter(name => name.gender === (filters.gender as "boy" | "girl" | "unisex"));
        }
        
        if (filters.length !== 'all') {
          filteredNames = filteredNames.filter(name => name.length === filters.length);
        }
        
        if (filters.letter !== '' && filters.letter !== 'all') {
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
      } finally {
        setLoading(false);
      }
    };

    fetchNames();
  }, [filters]);

  const handleFilter = (newFilters) => {
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
          
          <NameFilters 
            onFilter={handleFilter}
            initialFilters={filters}
            showSearch={true}
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
