
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search, Filter, X } from "lucide-react";

interface NameFiltersProps {
  onFilter: (filters: FilterState) => void;
  initialFilters?: Partial<FilterState>;
  showSearch?: boolean;
}

export interface FilterState {
  gender: "all" | "boy" | "girl" | "unisex";
  length: "all" | "short" | "medium" | "long";
  letter: string;
  search: string;
}

const NameFilters = ({ 
  onFilter, 
  initialFilters = {}, 
  showSearch = true 
}: NameFiltersProps) => {
  const [filters, setFilters] = useState<FilterState>({
    gender: initialFilters.gender || "all",
    length: initialFilters.length || "all",
    letter: initialFilters.letter || "",
    search: initialFilters.search || ""
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange("search", e.target.value);
  };

  const resetFilters = () => {
    const newFilters = {
      gender: "all",
      length: "all",
      letter: "",
      search: ""
    };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ".split("");

  return (
    <div className="mb-6">
      {showSearch && (
        <div className="relative mb-4">
          <Input
            type="text"
            placeholder="Søk etter navn, betydning eller opprinnelse..."
            value={filters.search}
            onChange={handleSearchChange}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          <span>Filtre</span>
        </Button>

        {(filters.gender !== "all" || filters.length !== "all" || filters.letter !== "") && (
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

      {isOpen && (
        <div className="bg-gray-50 p-4 rounded-md mb-4">
          <Accordion type="single" collapsible defaultValue="gender">
            <AccordionItem value="gender">
              <AccordionTrigger>Kjønn</AccordionTrigger>
              <AccordionContent>
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
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="length">
              <AccordionTrigger>Lengde</AccordionTrigger>
              <AccordionContent>
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
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="letter">
              <AccordionTrigger>Forbokstav</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap gap-2">
                  {alphabet.map((letter) => (
                    <Button
                      key={letter}
                      variant={filters.letter === letter ? "default" : "outline"}
                      size="sm"
                      className="w-8 h-8 p-0"
                      onClick={() => handleChange("letter", filters.letter === letter ? "" : letter)}
                    >
                      {letter}
                    </Button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </div>
  );
};

export default NameFilters;
