
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BabyName } from "@/data/types";
import { fetchNameById } from "@/integrations/supabase/name-queries";
import { toast } from "sonner";

interface NameList {
  id: string;
  name: string;
  description: string | null;
  is_public: boolean;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export function useNameListDetail(id: string | undefined) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [nameList, setNameList] = useState<NameList | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [isAddNameDialogOpen, setIsAddNameDialogOpen] = useState(false);
  const [isCreatePollDialogOpen, setIsCreatePollDialogOpen] = useState(false);
  
  const {
    data: listNames,
    isLoading: isLoadingNames,
    refetch: refetchNames
  } = useQuery({
    queryKey: ['name-list-items', id],
    queryFn: async () => {
      if (!id) return [];
      
      // Fetch all list items
      const { data: listItems, error } = await supabase
        .from("name_list_items")
        .select("name_id")
        .eq("list_id", id);
      
      if (error) throw error;
      
      if (!listItems?.length) return [];
      
      // Fetch details for each name
      const nameIds = listItems.map(item => item.name_id);
      const names = await Promise.all(
        nameIds.map(nameId => fetchNameById(nameId))
      );
      
      return names.filter((name): name is BabyName => name !== null);
    },
    enabled: !!id
  });
  
  useEffect(() => {
    const fetchNameList = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from("name_lists")
          .select("*")
          .eq("id", id)
          .single();
        
        if (error) throw error;
        
        setNameList(data);
        setIsOwner(user?.id === data.user_id);
      } catch (error) {
        console.error("Error fetching name list:", error);
        toast.error("Kunne ikke laste navnelisten");
      }
    };
    
    fetchNameList();
  }, [id, user]);
  
  const handleAddNames = () => {
    if (!user) {
      toast.error("Du må være logget inn for å legge til navn");
      navigate("/auth");
      return;
    }
    
    if (!isOwner) {
      toast.error("Du kan bare legge til navn i dine egne lister");
      return;
    }
    
    setIsAddNameDialogOpen(true);
  };

  const handleCreatePoll = () => {
    if (!user) {
      toast.error("Du må være logget inn for å opprette avstemninger");
      navigate("/auth");
      return;
    }
    
    if (!listNames || listNames.length === 0) {
      toast.error("Listen må inneholde navn for å opprette en avstemning");
      return;
    }
    
    setIsCreatePollDialogOpen(true);
  };
  
  return {
    nameList,
    isOwner,
    listNames,
    isLoadingNames,
    refetchNames,
    isAddNameDialogOpen,
    setIsAddNameDialogOpen,
    isCreatePollDialogOpen,
    setIsCreatePollDialogOpen,
    handleAddNames,
    handleCreatePoll
  };
}
