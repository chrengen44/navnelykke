
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { BabyName } from "@/data/types";

interface PollNameSelectorProps {
  names: BabyName[];
  selectedIds: number[];
  onSelectionChange: (ids: number[]) => void;
}

const PollNameSelector = ({ names, selectedIds, onSelectionChange }: PollNameSelectorProps) => {
  const handleSelectAll = () => {
    onSelectionChange(names.map(name => name.id));
  };

  const handleSelectNone = () => {
    onSelectionChange([]);
  };

  const toggleName = (nameId: number) => {
    onSelectionChange(
      selectedIds.includes(nameId)
        ? selectedIds.filter(id => id !== nameId)
        : [...selectedIds, nameId]
    );
  };

  return (
    <div className="mt-4">
      <div className="flex justify-between mb-2">
        <Label>Velg navn for avstemningen</Label>
        <div className="flex gap-2 text-sm">
          <button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={handleSelectAll}
          >
            Velg alle
          </button>
          <button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={handleSelectNone}
          >
            Fjern alle
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[300px] overflow-y-auto">
        {names.map((name) => (
          <Card
            key={name.id}
            className={`cursor-pointer transition-colors ${
              selectedIds.includes(name.id)
                ? 'border-pink-500 bg-pink-50'
                : 'hover:border-gray-300'
            }`}
            onClick={() => toggleName(name.id)}
          >
            <CardContent className="p-3 flex justify-between items-center">
              <div>
                <p className="font-medium">{name.name}</p>
              </div>
              {selectedIds.includes(name.id) && (
                <Check className="h-4 w-4 text-pink-500" />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      <p className="text-sm text-gray-500 mt-2">
        Valgt {selectedIds.length} av {names.length} navn
      </p>
    </div>
  );
};

export default PollNameSelector;
