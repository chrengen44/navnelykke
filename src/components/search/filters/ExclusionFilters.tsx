
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FilterChangeHandler } from "./types";

export function ExclusionFilters({ onFilterChange }: FilterChangeHandler) {
  return (
    <div className="space-y-4">
      <h3 className="font-medium">Ekskluder kriterier</h3>

      <div className="space-y-2">
        <Label>Ekskluder forbokstaver</Label>
        <Input
          type="text"
          placeholder="F.eks. 'X, Y, Z'"
          onChange={(e) => onFilterChange("excludeLetters", e.target.value)}
          className="max-w-xs"
        />
        <p className="text-sm text-gray-500">
          Skriv inn bokstaver adskilt med komma for å utelukke navn som begynner med disse
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="excludeTopPopular"
          onCheckedChange={(checked) => 
            onFilterChange("excludeTopPopular", checked === true)
          }
        />
        <Label htmlFor="excludeTopPopular">
          Ekskluder topp 10 mest populære navn
        </Label>
      </div>
    </div>
  );
}
