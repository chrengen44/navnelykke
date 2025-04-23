
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FilterChangeHandler } from "./types";

export function GenderFilter({ onFilterChange }: FilterChangeHandler) {
  return (
    <div className="space-y-2">
      <Label>Kjønn</Label>
      <RadioGroup
        defaultValue="all"
        onValueChange={(value) => onFilterChange("gender", value)}
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
  );
}
