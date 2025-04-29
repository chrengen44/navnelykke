
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { BabyName } from "@/data/types";

interface NameCardProps {
  name: BabyName;
  isSelected: boolean;
  isInList: boolean;
  onToggle: () => void;
}

const NameCard = ({ name, isSelected, isInList, onToggle }: NameCardProps) => {
  return (
    <Card
      className={`p-4 cursor-pointer transition-colors ${
        isSelected
          ? 'border-pink-500 bg-pink-50'
          : isInList
          ? 'border-gray-300 bg-gray-100'
          : 'hover:border-gray-300'
      }`}
      onClick={() => {
        if (!isInList) {
          onToggle();
        }
      }}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium">{name.name}</p>
          <p className="text-sm text-gray-500">{name.meaning}</p>
        </div>
        {isSelected ? (
          <Check className="h-5 w-5 text-pink-500" />
        ) : isInList ? (
          <span className="text-xs text-gray-500">Allerede i listen</span>
        ) : null}
      </div>
    </Card>
  );
};

export default NameCard;
