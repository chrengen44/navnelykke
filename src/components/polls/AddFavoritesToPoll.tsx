
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { BabyName } from "@/data/types";
import { fetchNameById } from "@/integrations/supabase/name-queries";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";

interface AddFavoritesToPollProps {
  pollId: string;
  onNamesAdded: () => void;
}

const AddFavoritesToPoll = ({ pollId, onNamesAdded }: AddFavoritesToPollProps) => {
  const { favorites } = useFavorites();
  const [selectedNames, setSelectedNames] = useState<number[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  const { data: favoriteNames, isLoading } = useQuery({
    queryKey: ['favorites', favorites],
    queryFn: async () => {
      const names = await Promise.all(
        favorites.map(id => fetchNameById(id))
      );
      return names.filter((name): name is BabyName => name !== null);
    },
    enabled: favorites.length > 0
  });

  const handleAddToPoll = async () => {
    if (selectedNames.length === 0) {
      toast.error("Velg minst ett navn");
      return;
    }

    setIsAdding(true);
    try {
      const promises = selectedNames.map(nameId => 
        supabase
          .from('poll_items')
          .insert({
            poll_id: pollId,
            name_id: nameId
          })
      );

      await Promise.all(promises);
      toast.success("Navn lagt til i avstemningen");
      onNamesAdded();
      setSelectedNames([]);
    } catch (error) {
      console.error("Error adding names to poll:", error);
      toast.error("Kunne ikke legge til navn i avstemningen");
    } finally {
      setIsAdding(false);
    }
  };

  const toggleName = (nameId: number) => {
    setSelectedNames(prev => 
      prev.includes(nameId) 
        ? prev.filter(id => id !== nameId)
        : [...prev, nameId]
    );
  };

  if (isLoading) {
    return <div>Laster favoritter...</div>;
  }

  if (!favoriteNames?.length) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Legg til fra favoritter</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {favoriteNames.map(name => (
          <Card 
            key={name.id}
            className={`p-4 cursor-pointer transition-colors ${
              selectedNames.includes(name.id) 
                ? 'border-pink-500 bg-pink-50' 
                : 'hover:border-gray-400'
            }`}
            onClick={() => toggleName(name.id)}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{name.name}</p>
                <p className="text-sm text-gray-500">{name.meaning}</p>
              </div>
              {selectedNames.includes(name.id) && (
                <Check className="h-5 w-5 text-pink-500" />
              )}
            </div>
          </Card>
        ))}
      </div>
      {selectedNames.length > 0 && (
        <Button 
          onClick={handleAddToPoll}
          disabled={isAdding}
          className="mt-4"
        >
          {isAdding ? "Legger til..." : `Legg til ${selectedNames.length} navn`}
        </Button>
      )}
    </div>
  );
};

export default AddFavoritesToPoll;
