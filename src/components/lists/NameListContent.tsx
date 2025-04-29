
import { BabyName } from "@/data/types";
import NameGrid from "@/components/NameGrid";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface NameListContentProps {
  isLoading: boolean;
  names: BabyName[] | undefined;
  isOwner: boolean;
  onAddNames: () => void;
}

const NameListContent = ({ isLoading, names, isOwner, onAddNames }: NameListContentProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <Skeleton key={i} className="h-40" />
        ))}
      </div>
    );
  }
  
  if (!names || names.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Ingen navn i listen</h2>
        <p className="text-gray-600 mb-6">
          {isOwner 
            ? "Du har ikke lagt til noen navn i denne listen ennå." 
            : "Det er ingen navn i denne listen ennå."}
        </p>
        {isOwner && (
          <Button onClick={onAddNames}>
            <Plus className="h-4 w-4 mr-2" />
            Legg til navn
          </Button>
        )}
      </div>
    );
  }
  
  return (
    <NameGrid 
      names={names} 
      showDetails={true}
      linkToDetail={true}
    />
  );
};

export default NameListContent;
