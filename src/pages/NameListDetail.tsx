
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BabyName } from "@/data/types";
import NameGrid from "@/components/NameGrid";
import { Share2, Globe, Lock, Plus, Vote } from "lucide-react";
import { toast } from "sonner";
import AddNameToListDialog from "@/components/lists/AddNameToListDialog";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchNameById } from "@/integrations/supabase/name-queries";
import CreatePollFromListDialog from "@/components/lists/CreatePollFromListDialog";

interface NameList {
  id: string;
  name: string;
  description: string | null;
  is_public: boolean;
  user_id: string;
  created_at: string;
  updated_at: string;
}

const NameListDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isAddNameDialogOpen, setIsAddNameDialogOpen] = useState(false);
  const [isCreatePollDialogOpen, setIsCreatePollDialogOpen] = useState(false);
  const [nameList, setNameList] = useState<NameList | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  
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
  
  const handleShare = async () => {
    try {
      const shareUrl = `${window.location.origin}/name-list/${id}`;
      
      if (navigator.share) {
        await navigator.share({
          title: nameList?.name || "Navneliste",
          text: `Sjekk ut denne navnelisten: ${nameList?.name || ""}`,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Lenke kopiert til utklippstavlen!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };
  
  const isLoading = !nameList;
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-1/3" />
              <Skeleton className="h-6 w-1/2" />
              <div className="flex gap-2">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold">{nameList?.name}</h1>
                    {nameList?.is_public ? (
                      <Globe className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Lock className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  {nameList?.description && (
                    <p className="text-gray-600">{nameList.description}</p>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {isOwner && (
                    <Button onClick={handleAddNames}>
                      <Plus className="h-4 w-4 mr-2" />
                      Legg til navn
                    </Button>
                  )}
                  {listNames && listNames.length > 0 && (
                    <Button 
                      onClick={handleCreatePoll}
                      variant={isOwner ? "outline" : "default"}
                    >
                      <Vote className="h-4 w-4 mr-2" />
                      Opprett avstemning
                    </Button>
                  )}
                  <Button variant="outline" onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Del liste
                  </Button>
                </div>
              </div>
            </>
          )}

          {isLoadingNames ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <Skeleton key={i} className="h-40" />
              ))}
            </div>
          ) : listNames && listNames.length > 0 ? (
            <NameGrid 
              names={listNames} 
              showDetails={true}
              linkToDetail={true}
            />
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Ingen navn i listen</h2>
              <p className="text-gray-600 mb-6">
                {isOwner 
                  ? "Du har ikke lagt til noen navn i denne listen ennå." 
                  : "Det er ingen navn i denne listen ennå."}
              </p>
              {isOwner && (
                <Button onClick={handleAddNames}>
                  <Plus className="h-4 w-4 mr-2" />
                  Legg til navn
                </Button>
              )}
            </div>
          )}
        </div>
        
        {nameList && (
          <>
            <AddNameToListDialog
              open={isAddNameDialogOpen}
              onOpenChange={setIsAddNameDialogOpen}
              listId={nameList.id}
              onNamesAdded={() => {
                refetchNames();
                toast.success("Navn lagt til i listen!");
              }}
            />
            
            {listNames && (
              <CreatePollFromListDialog 
                open={isCreatePollDialogOpen}
                onOpenChange={setIsCreatePollDialogOpen}
                names={listNames}
                listName={nameList.name}
              />
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default NameListDetail;
