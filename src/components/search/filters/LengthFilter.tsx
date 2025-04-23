
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FilterChangeHandler } from "./types";

export function LengthFilter({ onFilterChange }: FilterChangeHandler) {
  return (
    <div className="space-y-2">
      <Label>Lengde</Label>
      <RadioGroup
        defaultValue="all"
        onValueChange={(value) => onFilterChange("length", value)}
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
  );
}
