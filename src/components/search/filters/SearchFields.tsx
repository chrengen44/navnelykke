
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { FilterChangeHandler } from "./types";
import { AutocompleteSearch } from "@/components/search/Autocomplete";

interface SearchFieldsProps extends FilterChangeHandler {
  showSearch?: boolean;
}

export function SearchFields({ onFilterChange, showSearch = true }: SearchFieldsProps) {
  return (
    <div className="space-y-4">
      {showSearch && (
        <AutocompleteSearch
          onSearch={(value) => onFilterChange("search", value)}
          placeholder="Søk etter navn, betydning eller opprinnelse..."
        />
      )}

      <div className="space-y-2">
        <Label>Betydning</Label>
        <div className="relative">
          <Input
            type="text"
            placeholder="F.eks. 'kjærlighet', 'styrke', 'lys'..."
            onChange={(e) => onFilterChange("meaning", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Opprinnelse</Label>
        <div className="relative">
          <Input
            type="text"
            placeholder="F.eks. 'norrønt', 'gresk', 'arabisk'..."
            onChange={(e) => onFilterChange("origin", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
