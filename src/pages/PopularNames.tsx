
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPopularNames, BabyName } from "@/data/names";
import NameGrid from "@/components/NameGrid";
import NameFilters, { FilterState } from "@/components/NameFilters";
import AdSpace from "@/components/AdSpace";

const PopularNames = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialGender = searchParams.get("gender") as "boy" | "girl" | "unisex" | null;
  
  const [names, setNames] = useState<BabyName[]>([]);
  const [filteredNames, setFilteredNames] = useState<BabyName[]>([]);
  
  const initialFilters: Partial<FilterState> = {
    gender: initialGender || "all"
  };
  
  useEffect(() => {
    // Get all popular names initially
    const allPopularNames = getPopularNames(undefined, 50);
    setNames(allPopularNames);
    
    // Apply initial filters if any
    handleFilter({
      gender: initialGender || "all",
      length: "all",
      letter: "",
      search: ""
    });
  }, [initialGender]);
  
  const handleFilter = (filters: FilterState) => {
    let filtered = [...names];
    
    // Filter by gender
    if (filters.gender !== "all") {
      filtered = filtered.filter(name => name.gender === filters.gender);
      
      // Update URL parameter for gender
      if (filters.gender !== "all") {
        setSearchParams({ gender: filters.gender });
      } else {
        searchParams.delete("gender");
        setSearchParams(searchParams);
      }
    } else {
      searchParams.delete("gender");
      setSearchParams(searchParams);
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
    
    // Filter by search query
    if (filters.search) {
      const query = filters.search.toLowerCase();
      filtered = filtered.filter(name => 
        name.name.toLowerCase().includes(query) ||
        name.meaning.toLowerCase().includes(query) ||
        name.origin.toLowerCase().includes(query)
      );
    }
    
    setFilteredNames(filtered);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-gradient-to-br from-babypink via-white to-babyblue py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Populære babynavn</h1>
              <p className="text-lg text-gray-700">
                Utforsk de mest populære navnene i Norge akkurat nå
              </p>
            </div>
          </div>
        </div>
        
        <section className="py-8">
          <div className="container mx-auto px-4">
            <NameFilters onFilter={handleFilter} initialFilters={initialFilters} />
            
            <NameGrid 
              names={filteredNames} 
              showDetails={true}
              emptyMessage="Ingen navn funnet med disse filtrene. Prøv å justere søkekriteriene."
            />
            
            <div className="mt-8">
              <AdSpace type="horizontal" />
            </div>
          </div>
        </section>
        
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Trender i babynavn</h2>
              <p className="text-gray-600 max-w-3xl">
                Navnetrender endrer seg over tid, påvirket av populærkultur, historiske hendelser og samfunnsendringer. 
                Her er noen aktuelle trender vi ser i norske babynavn.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Kortere navn blir mer populære</h3>
                <p className="text-gray-600">
                  Korte, enkle navn med få stavelser har blitt stadig mer populære. Navn som Emma, Noah, Ella og Leo er eksempler på denne trenden.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Tilbake til røttene</h3>
                <p className="text-gray-600">
                  Mange foreldre velger tradisjonelle nordiske navn, ofte fra vikingtiden. Navn som Odin, Frøya, Sigrid og Bjørn er på vei tilbake.
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

export default PopularNames;
