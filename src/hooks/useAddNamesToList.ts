
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useFavorites } from "@/contexts/FavoritesContext";
import { BabyName } from "@/data/types";
import { fetchNameById } from "@/integrations/supabase/name-queries";

export function useAddNamesToList(listId: string, onNamesAdded: () => void) {
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
    enabled: favorites.length > 0
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
    enabled: !!listId
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
    enabled: searchQuery.length >= 2
  });

  const handleSubmit = async (onClose: () => void) => {
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
        onClose();
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
      onClose();
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

  return {
    isLoading,
    selectedNames,
    searchQuery,
    setSearchQuery,
    favoriteNames,
    isFavoritesLoading,
    searchResults,
    isSearching,
    handleSubmit,
    toggleName,
    isNameInList
  };
}
