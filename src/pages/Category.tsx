import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getNamesByCategory, nameCategories } from "@/data";
import NameGrid from "@/components/NameGrid";
import AdvancedNameFilters, { AdvancedFilterState } from "@/components/search/AdvancedNameFilters";
import AdSpace from "@/components/AdSpace";
import { 
  Crown, 
  TrendingUp, 
  Gem, 
  MountainSnow, 
  Anchor, 
  Book, 
  Globe, 
  Flower,
  LucideIcon
} from "lucide-react";
import { BabyName } from "@/data/types";

const Category = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [filteredNames, setFilteredNames] = useState<BabyName[]>([]);
  const [loading, setLoading] = useState(true);
  
  const category = nameCategories.find(c => c.id === categoryId);
  
  useEffect(() => {
    const fetchNames = async () => {
      setLoading(true);
      try {
        const names = await getNamesByCategory(categoryId || "");
        setFilteredNames(names);
      } catch (error) {
        console.error("Error fetching names for category:", error);
        setFilteredNames([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNames();
  }, [categoryId]);
  
  const handleFilter = (filters: AdvancedFilterState) => {
    const fetchAndFilterNames = async () => {
      setLoading(true);
      try {
        let filtered = await getNamesByCategory(categoryId || "");
        
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
        
        // Filter by search query
        if (filters.search) {
          const query = filters.search.toLowerCase();
          filtered = filtered.filter(name => 
            name.name.toLowerCase().includes(query) ||
            name.meaning.toLowerCase().includes(query) ||
            name.origin.toLowerCase().includes(query)
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
        
        setFilteredNames(filtered);
      } catch (error) {
        console.error("Error filtering names:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndFilterNames();
  };
  
  const getIcon = (): LucideIcon => {
    if (!category) return Crown;
    
    switch (category.icon) {
      case "crown":
        return Crown;
      case "trending-up":
        return TrendingUp;
      case "gem":
        return Gem;
      case "mountain-snow":
        return MountainSnow;
      case "anchor":
        return Anchor;
      case "book":
        return Book;
      case "globe":
        return Globe;
      case "flower":
        return Flower;
      default:
        return Crown;
    }
  };
  
  const IconComponent = getIcon();
  
  if (!category) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12">
          <h1 className="text-2xl font-bold mb-4">Kategori ikke funnet</h1>
          <p>Beklager, vi kunne ikke finne kategorien du leter etter.</p>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-gradient-to-br from-babyblue via-white to-babypink py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-sm">
                  <IconComponent className="w-8 h-8 text-gray-800" />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{category.title}</h1>
              <p className="text-lg text-gray-700">
                {category.description}
              </p>
            </div>
          </div>
        </div>
        
        <section className="py-8">
          <div className="container mx-auto px-4">
            <AdvancedNameFilters onFilter={handleFilter} />
            
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
              </div>
            ) : (
              <NameGrid 
                names={filteredNames} 
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

export default Category;
