
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Plus, List, Share } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import CreateNameListDialog from "@/components/lists/CreateNameListDialog";
import NameListCard from "@/components/lists/NameListCard";
import { Card } from "@/components/ui/card";

interface NameList {
  id: string;
  name: string;
  description: string | null;
  is_public: boolean;
  created_at: string;
  item_count?: number;
}

const NameLists = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const {
    data: nameLists,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['name-lists', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('name_lists')
        .select(`
          *,
          name_list_items(count)
        `)
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      return data.map((list: any) => ({
        ...list,
        item_count: list.name_list_items[0]?.count || 0
      }));
    },
    enabled: !!user
  });

  const handleCreateList = () => {
    if (!user) {
      toast("Du må være logget inn for å opprette lister");
      navigate("/auth");
      return;
    }
    setIsCreateDialogOpen(true);
  };

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <Card className="max-w-md mx-auto p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Logg inn for å se dine lister</h2>
            <p className="text-gray-600 mb-6">
              Du må være logget inn for å opprette og administrere navnelister.
            </p>
            <Button onClick={() => navigate("/auth")}>
              Logg inn eller registrer deg
            </Button>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">Mine navnelister</h1>
              <p className="text-gray-600 mt-2">
                Opprett og del lister med dine favorittnavn
              </p>
            </div>
            <Button onClick={handleCreateList} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Ny liste
            </Button>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p>Laster lister...</p>
            </div>
          ) : nameLists && nameLists.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nameLists.map((list: NameList) => (
                <NameListCard 
                  key={list.id} 
                  list={list} 
                  onRefresh={() => refetch()} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <List className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Ingen lister ennå</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Du har ikke opprettet noen navnelister ennå. Opprett en liste for å samle og organisere navneideer.
              </p>
              <Button
                onClick={handleCreateList}
                className="bg-pink-500 hover:bg-pink-600"
              >
                Opprett din første liste
              </Button>
            </div>
          )}
        </div>

        <CreateNameListDialog 
          open={isCreateDialogOpen} 
          onOpenChange={setIsCreateDialogOpen} 
          onSuccess={() => {
            refetch();
            toast.success("Listen ble opprettet!");
          }} 
        />
      </div>
    </Layout>
  );
};

export default NameLists;
