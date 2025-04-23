
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Filter, X } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { SearchFields } from "./filters/SearchFields";
import { GenderFilter } from "./filters/GenderFilter";
import { LengthFilter } from "./filters/LengthFilter";
import { PopularityFilter } from "./filters/PopularityFilter";
import { ExclusionFilters } from "./filters/ExclusionFilters";
import { AdvancedFilterState } from "./filters/types";

interface AdvancedNameFiltersProps {
  onFilter: (filters: AdvancedFilterState) => void;
  initialFilters?: Partial<AdvancedFilterState>;
  showSearch?: boolean;
}

const AdvancedNameFilters = ({
  onFilter,
  initialFilters = {},
  showSearch = true,
}: AdvancedNameFiltersProps) => {
  const [filters, setFilters] = useState<AdvancedFilterState>({
    gender: initialFilters.gender || "all",
    length: initialFilters.length || "all",
    letter: initialFilters.letter || "",
    search: initialFilters.search || "",
    meaning: initialFilters.meaning || "",
    origin: initialFilters.origin || "",
    popularity: initialFilters.popularity || [0, 100],
    excludeLetters: initialFilters.excludeLetters || "",
    excludeTopPopular: initialFilters.excludeTopPopular || false,
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (
    key: keyof AdvancedFilterState,
    value: string | number[] | boolean
  ) => {
    const newFilters = { ...filters };
    if (key === "popularity" && Array.isArray(value)) {
      newFilters.popularity = value;
    } else if (
      key === "gender" &&
      ["all", "boy", "girl", "unisex"].includes(value as string)
    ) {
      newFilters.gender = value as "all" | "boy" | "girl" | "unisex";
    } else if (key === "length" && ["all", "short", "medium", "long"].includes(value as string)) {
      newFilters.length = value as "all" | "short" | "medium" | "long";
    } else if (typeof value === "string" || typeof value === "boolean") {
      (newFilters as any)[key] = value;
    }

    setFilters(newFilters);
    onFilter(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters: AdvancedFilterState = {
      gender: "all",
      length: "all",
      letter: "",
      search: "",
      meaning: "",
      origin: "",
      popularity: [0, 100],
      excludeLetters: "",
      excludeTopPopular: false,
    };
    setFilters(defaultFilters);
    onFilter(defaultFilters);
  };

  const hasActiveFilters = () =>
    filters.gender !== "all" ||
    filters.length !== "all" ||
    filters.letter !== "" ||
    filters.meaning !== "" ||
    filters.origin !== "" ||
    filters.popularity[0] !== 0 ||
    filters.popularity[1] !== 100 ||
    filters.excludeLetters !== "" ||
    filters.excludeTopPopular;

  return (
    <div className="space-y-4">
      <SearchFields onFilterChange={handleChange} showSearch={showSearch} />

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          <span>Avanserte filtre</span>
        </Button>

        {hasActiveFilters() && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="flex items-center gap-2 text-gray-500"
          >
            <X className="h-4 w-4" />
            <span>Tilbakestill</span>
          </Button>
        )}
      </div>

      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleContent className="space-y-4 bg-gray-50 p-4 rounded-md">
          <div className="space-y-4">
            <GenderFilter onFilterChange={handleChange} />
            <LengthFilter onFilterChange={handleChange} />
            <PopularityFilter onFilterChange={handleChange} />
            <Separator />
            <ExclusionFilters onFilterChange={handleChange} />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default AdvancedNameFilters;
