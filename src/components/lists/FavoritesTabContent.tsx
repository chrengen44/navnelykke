
import { BabyName } from "@/data/types";
import NameCard from "./NameCard";

interface FavoritesTabContentProps {
  isLoading: boolean;
  names: BabyName[] | undefined;
  selectedNames: number[];
  isNameInList: (nameId: number) => boolean;
  toggleName: (nameId: number) => void;
}

const FavoritesTabContent = ({
  isLoading,
  names,
  selectedNames,
  isNameInList,
  toggleName
}: FavoritesTabContentProps) => {
  if (isLoading) {
    return (
      <div className="text-center py-4">
        <p>Laster favoritter...</p>
      </div>
    );
  }

  if (!names || names.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Du har ingen favoritter ennå.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {names.map((name) => (
          <NameCard
            key={name.id}
            name={name}
            isSelected={selectedNames.includes(name.id)}
            isInList={isNameInList(name.id)}
            onToggle={() => toggleName(name.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesTabContent;
