
import { useState, useEffect } from "react";
import { getNamesByCategory } from "@/data";
import { BabyName } from "@/data/types";
import { AdvancedFilterState } from "@/components/search/filters/types";

export const useCategoryNames = (categoryId: string) => {
  const [names, setNames] = useState<BabyName[]>([]);
  const [filteredNames, setFilteredNames] = useState<BabyName[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchNames = async () => {
      setLoading(true);
      try {
        const fetchedNames = await getNamesByCategory(categoryId || "");
        setNames(fetchedNames);
        setFilteredNames(fetchedNames);
      } catch (error) {
        console.error("Error fetching names for category:", error);
        setNames([]);
        setFilteredNames([]);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchNames();
    }
  }, [categoryId]);
  
  const handleFilter = (filters: AdvancedFilterState) => {
    setLoading(true);
    try {
      let filtered = [...names];
      
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
  
  return { names, filteredNames, loading, handleFilter };
};
