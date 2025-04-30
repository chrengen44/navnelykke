
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { searchNames } from "@/integrations/supabase/search";
import { BabyName } from "@/data/types";
import AdvancedNameFilters from "@/components/search/AdvancedNameFilters";
import AdSpace from "@/components/AdSpace";
import SearchResults from "@/components/search/SearchResults";
import SearchTips from "@/components/search/SearchTips";
import { AutocompleteSearch } from "@/components/search/Autocomplete";
import { toast } from "sonner";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const [allResults, setAllResults] = useState<BabyName[]>([]);
  const [filteredResults, setFilteredResults] = useState<BabyName[]>([]);
  const [loading, setLoading] = useState(true);
  const [useFuzzySearch, setUseFuzzySearch] = useState(true);
  
  // Simple function to handle search
  const handleSearch = (newQuery: string) => {
    if (newQuery.trim()) {
      setSearchParams({ q: newQuery });
    }
  };
  
  // Effect to fetch search results when query changes
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setAllResults([]);
        setFilteredResults([]);
        setLoading(false);
        return;
      }
      
      setLoading(true);
      try {
        const results = await searchNames(query, { fuzzy: useFuzzySearch });
        setAllResults(results);
        setFilteredResults(results);
        
        // Notify user if fuzzy search found results that might not match exactly
        if (useFuzzySearch && results.length > 0 && !results.some(n => 
          n.name.toLowerCase().includes(query.toLowerCase()))) {
          toast.info("Vi viser lignende resultater siden ingen eksakte treff ble funnet.");
        }
        
      } catch (error) {
        console.error("Error searching names:", error);
        toast.error("Det oppstod en feil under søket. Vennligst prøv igjen.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchSearchResults();
  }, [query, useFuzzySearch]);
  
  // Handle filter changes
  const handleFilter = (filters: any) => {
    let filtered = [...allResults];
    
    // Filter by gender
    if (filters.gender !== "all") {
      filtered = filtered.filter(name => name.gender === filters.gender);
    }
    
    // Filter by length
    if (filters.length !== "all") {
      filtered = filtered.filter(name => name.length === filters.length);
    }
    
    // Filter by first letter
    if (filters.letter) {
      filtered = filtered.filter(name => 
        name.firstLetter.toLowerCase() === filters.letter.toLowerCase()
      );
    }
    
    // Filter by meaning
    if (filters.meaning) {
      const meaningLower = filters.meaning.toLowerCase();
      filtered = filtered.filter(name => 
        name.meaning.toLowerCase().includes(meaningLower)
      );
    }
    
    // Filter by origin
    if (filters.origin) {
      const originLower = filters.origin.toLowerCase();
      filtered = filtered.filter(name => 
        name.origin.toLowerCase().includes(originLower)
      );
    }
    
    // Filter by popularity range
    if (filters.popularity) {
      filtered = filtered.filter(name => 
        name.popularity >= filters.popularity[0] && 
        name.popularity <= filters.popularity[1]
      );
    }
    
    // Apply exclusion filters
    if (filters.excludeLetters) {
      const excludedLetters = filters.excludeLetters
        .split(",")
        .map((letter: string) => letter.trim().toLowerCase());
      filtered = filtered.filter(name => 
        !excludedLetters.includes(name.firstLetter.toLowerCase())
      );
    }
    
    // Exclude top popular names if selected
    if (filters.excludeTopPopular) {
      filtered = filtered.filter(name => name.popularity > 10);
    }
    
    setFilteredResults(filtered);
  };
  
  const toggleFuzzySearch = () => {
    setUseFuzzySearch(!useFuzzySearch);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-gradient-to-br from-babypink via-white to-babyblue py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Søkeresultater</h1>
              <div className="mb-6">
                <AutocompleteSearch 
                  onSearch={handleSearch}
                  placeholder="Søk etter navn, betydning eller opprinnelse..."
                  inputClassName="max-w-md mx-auto"
                />
              </div>
              <div className="flex items-center justify-center gap-2 text-sm">
                <input 
                  type="checkbox" 
                  id="fuzzySearch"
                  checked={useFuzzySearch}
                  onChange={toggleFuzzySearch}
                  className="rounded text-pink-500 focus:ring-pink-500"
                />
                <label htmlFor="fuzzySearch">
                  Inkluder lignende resultater (fikser stavefeil)
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <section className="py-8">
          <div className="container mx-auto px-4">
            <AdvancedNameFilters onFilter={handleFilter} showSearch={false} />
            
            <SearchResults 
              loading={loading}
              results={filteredResults}
              query={query}
            />
            
            <div className="mt-8">
              <AdSpace type="horizontal" />
            </div>
          </div>
        </section>
        
        <SearchTips />
      </main>
      <Footer />
    </div>
  );
};

export default Search;
