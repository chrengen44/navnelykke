
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FilterChangeHandler } from "./types";
import { AutocompleteSearch } from "@/components/search/Autocomplete";

interface SearchFieldsProps extends FilterChangeHandler {
  showSearch?: boolean;
}

export function SearchFields({ onFilterChange, showSearch = true }: SearchFieldsProps) {
  const [search, setSearch] = useState("");

  // Handle search input change
  const handleSearchChange = (value: string) => {
    setSearch(value);
    onFilterChange("search", value);
  };

  return (
    <div className="space-y-4">
      {showSearch && (
        <div className="space-y-2">
          <Label>Søk</Label>
          {/* Use the Input component as fallback if Autocomplete fails */}
          <div className="relative">
            <AutocompleteSearch
              onSearch={handleSearchChange}
              placeholder="Søk etter navn, betydning eller opprinnelse..."
              initialValue={search}
            />
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label>Betydning</Label>
        <Input
          type="text"
          placeholder="F.eks. 'kjærlighet', 'styrke', 'lys'..."
          onChange={(e) => onFilterChange("meaning", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Opprinnelse</Label>
        <Input
          type="text"
          placeholder="F.eks. 'norrønt', 'gresk', 'arabisk'..."
          onChange={(e) => onFilterChange("origin", e.target.value)}
        />
      </div>
    </div>
  );
}
