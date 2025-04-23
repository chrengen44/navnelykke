
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { searchNames, BabyName } from "@/data";
import NameGrid from "@/components/NameGrid";
import AdvancedNameFilters from "@/components/search/AdvancedNameFilters";
import { AdvancedFilterState } from "@/components/search/filters/types";
import AdSpace from "@/components/AdSpace";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const [allResults, setAllResults] = useState<BabyName[]>([]);
  const [filteredResults, setFilteredResults] = useState<BabyName[]>([]);
  const [loading, setLoading] = useState(true);
  
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
        const results = await searchNames(query);
        setAllResults(results);
        setFilteredResults(results);
      } catch (error) {
        console.error("Error searching names:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSearchResults();
  }, [query]);
  
  const handleFilter = (filters: AdvancedFilterState) => {
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
        .map(letter => letter.trim().toLowerCase());
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
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-gradient-to-br from-babypink via-white to-babyblue py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Søkeresultater</h1>
              {query && (
                <p className="text-lg text-gray-700">
                  Resultater for "{query}"
                </p>
              )}
            </div>
          </div>
        </div>
        
        <section className="py-8">
          <div className="container mx-auto px-4">
            <AdvancedNameFilters onFilter={handleFilter} showSearch={false} />
            
            <div className="mb-6">
              <p className="text-gray-600">
                {loading ? "Søker..." : `Fant ${filteredResults.length} ${filteredResults.length === 1 ? "resultat" : "resultater"} for søket ditt.`}
              </p>
            </div>
            
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
              </div>
            ) : (
              <NameGrid 
                names={filteredResults} 
                showDetails={true}
                emptyMessage={query ? `Ingen navn funnet for "${query}". Prøv et annet søkeord eller juster filtrene.` : "Skriv inn et søkeord for å finne babynavn."}
              />
            )}
            
            <div className="mt-8">
              <AdSpace type="horizontal" />
            </div>
          </div>
        </section>
        
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Tips for navnesøk</h2>
              <p className="text-gray-600 mb-6">
                Hvis du ikke finner akkurat det du leter etter, prøv disse tipsene:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-2">Søk etter betydning</h3>
                  <p className="text-gray-600">
                    Prøv å søke etter egenskaper eller betydninger du ønsker i et navn, som "sterk", "vakker" eller "lys".
                  </p>
                </div>
                
                <div className="bg-white p-5 rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-2">Utforsk kategorier</h3>
                  <p className="text-gray-600">
                    Hvis du vet hvilken type navn du er ute etter, kan det være nyttig å utforske navnekategorier i stedet for å søke.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Search;
