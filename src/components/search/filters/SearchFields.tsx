
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { FilterChangeHandler } from "./types";

interface SearchFieldsProps extends FilterChangeHandler {
  showSearch?: boolean;
}

export function SearchFields({ onFilterChange, showSearch = true }: SearchFieldsProps) {
  return (
    <div className="space-y-4">
      {showSearch && (
        <div className="relative">
          <Input
            type="text"
            placeholder="Søk etter navn, betydning eller opprinnelse..."
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
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
