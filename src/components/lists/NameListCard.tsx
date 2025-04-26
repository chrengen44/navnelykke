
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash, Eye, Share2, Globe, Lock } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { formatDistanceToNow } from "date-fns";

interface NameList {
  id: string;
  name: string;
  description: string | null;
  is_public: boolean;
  created_at: string;
  item_count?: number;
}

interface NameListCardProps {
  list: NameList;
  onRefresh: () => void;
}

const NameListCard = ({ list, onRefresh }: NameListCardProps) => {
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleViewList = () => {
    navigate(`/name-list/${list.id}`);
  };
  
  const handleEditList = () => {
    navigate(`/name-list/${list.id}/edit`);
  };
  
  const handleShareList = async () => {
    try {
      const shareUrl = `${window.location.origin}/name-list/${list.id}`;
      
      if (navigator.share) {
        await navigator.share({
          title: list.name,
          text: `Sjekk ut denne navnelisten: ${list.name}`,
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
  
  const handleDeleteList = async () => {
    setIsDeleting(true);
    try {
      // First delete all items in the list
      const { error: itemsError } = await supabase
        .from("name_list_items")
        .delete()
        .eq("list_id", list.id);
        
      if (itemsError) throw itemsError;
      
      // Then delete the list itself
      const { error } = await supabase
        .from("name_lists")
        .delete()
        .eq("id", list.id);
        
      if (error) throw error;
      
      toast.success("Listen ble slettet");
      onRefresh();
    } catch (error) {
      console.error("Error deleting list:", error);
      toast.error("Kunne ikke slette listen");
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
    }
  };
  
  return (
    <>
      <Card className="h-full flex flex-col">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                {list.name}
                {list.is_public ? (
                  <Globe className="h-4 w-4 text-gray-400" />
                ) : (
                  <Lock className="h-4 w-4 text-gray-400" />
                )}
              </CardTitle>
              <CardDescription>
                {list.item_count} {list.item_count === 1 ? "navn" : "navn"} • Opprettet {formatDistanceToNow(new Date(list.created_at), { addSuffix: true })}
              </CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <span className="sr-only">Åpne meny</span>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z"
                      fill="currentColor"
                    />
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleEditList}>
                  <Pencil className="mr-2 h-4 w-4" />
                  <span>Rediger</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleShareList}>
                  <Share2 className="mr-2 h-4 w-4" />
                  <span>Del</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setDeleteDialogOpen(true)}
                  className="text-red-600"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  <span>Slett</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          {list.description && <p className="text-gray-600">{list.description}</p>}
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleViewList} 
            variant="outline" 
            className="w-full"
          >
            <Eye className="mr-2 h-4 w-4" />
            Vis liste
          </Button>
        </CardFooter>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Er du sikker?</AlertDialogTitle>
            <AlertDialogDescription>
              Dette vil permanent slette "{list.name}" og alle navn i listen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Avbryt</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteList}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Sletter..." : "Slett"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default NameListCard;
