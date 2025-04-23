
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { FilterChangeHandler } from "./types";

export function PopularityFilter({ onFilterChange }: FilterChangeHandler) {
  return (
    <div className="space-y-2">
      <Label>Popularitet (0-100)</Label>
      <Slider
        defaultValue={[0, 100]}
        onValueChange={(value) => onFilterChange("popularity", value)}
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
  );
}
