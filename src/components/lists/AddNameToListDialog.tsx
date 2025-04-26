
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useFavorites } from "@/contexts/FavoritesContext";
import { BabyName } from "@/data/types";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchNameById } from "@/integrations/supabase/name-queries";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface AddNameToListDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listId: string;
  onNamesAdded: () => void;
}

const AddNameToListDialog = ({
  open,
  onOpenChange,
  listId,
  onNamesAdded,
}: AddNameToListDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedNames, setSelectedNames] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { favorites } = useFavorites();
  
  const { data: favoriteNames, isLoading: isFavoritesLoading } = useQuery({
    queryKey: ['favorites', favorites],
    queryFn: async () => {
      if (!favorites.length) return [];
      
      const names = await Promise.all(
        favorites.map(id => fetchNameById(id))
      );
      
      return names.filter((name): name is BabyName => name !== null);
    },
    enabled: favorites.length > 0 && open
  });
  
  const { data: existingListItems } = useQuery({
    queryKey: ['name-list-existing-items', listId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("name_list_items")
        .select("name_id")
        .eq("list_id", listId);
        
      if (error) throw error;
      
      return data.map(item => item.name_id);
    },
    enabled: open && !!listId
  });
  
  const { data: searchResults, isLoading: isSearching } = useQuery({
    queryKey: ['name-search', searchQuery],
    queryFn: async () => {
      if (!searchQuery || searchQuery.length < 2) return [];
      
      const { data, error } = await supabase
        .from("baby_names")
        .select("*")
        .ilike("name", `%${searchQuery}%`)
        .order("popularity", { ascending: false })
        .limit(20);
        
      if (error) throw error;
      
      return data.map(name => ({
        id: name.id,
        name: name.name,
        gender: name.gender as 'boy' | 'girl' | 'unisex',
        origin: name.origin,
        meaning: name.meaning,
        popularity: name.popularity,
        length: name.length as 'short' | 'medium' | 'long',
        categories: [],
        firstLetter: name.first_letter,
        phonetic: name.phonetic || undefined,
      }));
    },
    enabled: searchQuery.length >= 2 && open
  });

  const handleSubmit = async () => {
    if (!listId || selectedNames.length === 0) {
      return;
    }

    setIsLoading(true);
    try {
      // Filter out names that already exist in the list
      const newNames = selectedNames.filter(nameId => 
        !existingListItems?.includes(nameId)
      );
      
      if (newNames.length === 0) {
        toast.info("Alle valgte navn er allerede i listen.");
        onOpenChange(false);
        return;
      }
      
      const items = newNames.map(name_id => ({
        list_id: listId,
        name_id
      }));
      
      const { error } = await supabase
        .from("name_list_items")
        .insert(items);
        
      if (error) throw error;
      
      onNamesAdded();
      onOpenChange(false);
      setSelectedNames([]);
    } catch (error) {
      console.error("Error adding names to list:", error);
      toast.error("Kunne ikke legge til navn i listen");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleName = (nameId: number) => {
    setSelectedNames(prev =>
      prev.includes(nameId)
        ? prev.filter(id => id !== nameId)
        : [...prev, nameId]
    );
  };
  
  const isNameInList = (nameId: number) => {
    return existingListItems?.includes(nameId) || false;
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Legg til navn i listen</DialogTitle>
          <DialogDescription>
            Velg navn fra dine favoritter eller søk etter navn
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="favorites">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="favorites">Fra favoritter</TabsTrigger>
            <TabsTrigger value="search">Søk etter navn</TabsTrigger>
          </TabsList>
          
          <TabsContent value="favorites" className="space-y-4 pt-4">
            {isFavoritesLoading ? (
              <div className="text-center py-4">
                <p>Laster favoritter...</p>
              </div>
            ) : favoriteNames && favoriteNames.length > 0 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {favoriteNames.map((name) => (
                    <Card
                      key={name.id}
                      className={`p-4 cursor-pointer transition-colors ${
                        selectedNames.includes(name.id)
                          ? 'border-pink-500 bg-pink-50'
                          : isNameInList(name.id)
                          ? 'border-gray-300 bg-gray-100'
                          : 'hover:border-gray-300'
                      }`}
                      onClick={() => {
                        if (!isNameInList(name.id)) {
                          toggleName(name.id);
                        }
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{name.name}</p>
                          <p className="text-sm text-gray-500">{name.meaning}</p>
                        </div>
                        {selectedNames.includes(name.id) ? (
                          <Check className="h-5 w-5 text-pink-500" />
                        ) : isNameInList(name.id) ? (
                          <span className="text-xs text-gray-500">Allerede i listen</span>
                        ) : null}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Du har ingen favoritter ennå.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="search" className="space-y-4 pt-4">
            <div className="space-y-4">
              <Input
                placeholder="Søk etter navn..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              
              {isSearching ? (
                <div className="text-center py-4">
                  <p>Søker...</p>
                </div>
              ) : searchResults && searchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {searchResults.map((name) => (
                    <Card
                      key={name.id}
                      className={`p-4 cursor-pointer transition-colors ${
                        selectedNames.includes(name.id)
                          ? 'border-pink-500 bg-pink-50'
                          : isNameInList(name.id)
                          ? 'border-gray-300 bg-gray-100'
                          : 'hover:border-gray-300'
                      }`}
                      onClick={() => {
                        if (!isNameInList(name.id)) {
                          toggleName(name.id);
                        }
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{name.name}</p>
                          <p className="text-sm text-gray-500">{name.meaning}</p>
                        </div>
                        {selectedNames.includes(name.id) ? (
                          <Check className="h-5 w-5 text-pink-500" />
                        ) : isNameInList(name.id) ? (
                          <span className="text-xs text-gray-500">Allerede i listen</span>
                        ) : null}
                      </div>
                    </Card>
                  ))}
                </div>
              ) : searchQuery.length >= 2 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Ingen navn funnet.</p>
                </div>
              ) : null}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 text-sm">
            {selectedNames.length > 0 && (
              <p>{selectedNames.length} navn valgt</p>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Avbryt
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isLoading || selectedNames.length === 0}
            >
              {isLoading ? "Legger til..." : "Legg til"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNameToListDialog;
