import { useState, useEffect } from "react";
import AdvancedNameFilters from "@/components/search/AdvancedNameFilters";
import NameGrid from "@/components/NameGrid";
import AdSpace from "@/components/AdSpace";
import { BabyName } from "@/data/types";
import { AdvancedFilterState } from "@/components/search/filters/types";
import { NameGridSkeleton } from "@/components/skeletons";

interface CategoryContentProps {
  initialNames: BabyName[];
  loading: boolean;
  onFilter: (filters: AdvancedFilterState) => void;
}

const CategoryContent = ({ initialNames, loading, onFilter }: CategoryContentProps) => {
  // Use state to track filtered names
  const [filteredNames, setFilteredNames] = useState<BabyName[]>(initialNames);
  
  // Update filtered names when initialNames changes
  useEffect(() => {
    setFilteredNames(initialNames);
  }, [initialNames]);
  
  const handleFilter = (filters: AdvancedFilterState) => {
    onFilter(filters);
  };

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <AdvancedNameFilters onFilter={handleFilter} />
        
        {loading ? (
          <NameGridSkeleton count={12} showDetails />
        ) : (
          <NameGrid 
            names={initialNames} 
            showDetails={true}
            emptyMessage="Ingen navn funnet med disse filtrene. Prøv å justere søkekriteriene."
          />
        )}
        
        <div className="mt-8">
          <AdSpace type="horizontal" />
        </div>
      </div>
    </section>
  );
};

export default CategoryContent;
