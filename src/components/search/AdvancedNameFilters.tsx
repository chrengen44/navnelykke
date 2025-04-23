
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Filter, Search, X } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export interface AdvancedFilterState {
  gender: "all" | "boy" | "girl" | "unisex";
  length: "all" | "short" | "medium" | "long";
  letter: string;
  search: string;
  meaning: string;
  origin: string;
  popularity: number[];
}

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
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (
    key: keyof AdvancedFilterState,
    value: string | number[]
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
    } else if (typeof value === "string") {
      // For string type properties like letter, search, meaning, origin
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
    filters.popularity[1] !== 100;

  return (
    <div className="space-y-4">
      {showSearch && (
        <div className="relative">
          <Input
            type="text"
            placeholder="Søk etter navn, betydning eller opprinnelse..."
            value={filters.search}
            onChange={(e) => handleChange("search", e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      )}

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
            <div className="space-y-2">
              <Label>Betydning</Label>
              <Input
                type="text"
                placeholder="F.eks. 'kjærlighet', 'styrke', 'lys'..."
                value={filters.meaning}
                onChange={(e) => handleChange("meaning", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Opprinnelse</Label>
              <Input
                type="text"
                placeholder="F.eks. 'norrønt', 'gresk', 'arabisk'..."
                value={filters.origin}
                onChange={(e) => handleChange("origin", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Popularitet (0-100)</Label>
              <Slider
                value={filters.popularity}
                onValueChange={(value) => handleChange("popularity", value)}
                min={0}
                max={100}
                step={1}
                className="my-4"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>Sjelden</span>
                <span>Veldig populær</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Kjønn</Label>
              <RadioGroup
                value={filters.gender}
                onValueChange={(value) => handleChange("gender", value)}
                className="flex flex-wrap gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all" />
                  <Label htmlFor="all">Alle</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="boy" id="boy" />
                  <Label htmlFor="boy">Guttenavn</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="girl" id="girl" />
                  <Label htmlFor="girl">Jentenavn</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="unisex" id="unisex" />
                  <Label htmlFor="unisex">Unisex</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Lengde</Label>
              <RadioGroup
                value={filters.length}
                onValueChange={(value) => handleChange("length", value)}
                className="flex flex-wrap gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="length-all" />
                  <Label htmlFor="length-all">Alle</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="short" id="short" />
                  <Label htmlFor="short">Korte navn</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium">Middels navn</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="long" id="long" />
                  <Label htmlFor="long">Lange navn</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default AdvancedNameFilters;
