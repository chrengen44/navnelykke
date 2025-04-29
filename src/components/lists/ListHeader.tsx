
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Share2, Globe, Lock, Plus, Vote } from "lucide-react";
import { BabyName } from "@/data/types";
import { toast } from "sonner";

interface ListHeaderProps {
  nameList: {
    id: string;
    name: string;
    description: string | null;
    is_public: boolean;
    user_id: string;
  } | null;
  isOwner: boolean;
  listNames: BabyName[] | undefined;
  onAddNames: () => void;
  onCreatePoll: () => void;
}

const ListHeader = ({ nameList, isOwner, listNames, onAddNames, onCreatePoll }: ListHeaderProps) => {
  const navigate = useNavigate();
  
  const handleShare = async () => {
    try {
      const shareUrl = `${window.location.origin}/name-list/${nameList?.id}`;
      
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
  
  if (!nameList) return null;
  
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">{nameList.name}</h1>
          {nameList.is_public ? (
            <Globe className="h-5 w-5 text-gray-400" />
          ) : (
            <Lock className="h-5 w-5 text-gray-400" />
          )}
        </div>
        {nameList.description && (
          <p className="text-gray-600">{nameList.description}</p>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {isOwner && (
          <Button onClick={onAddNames}>
            <Plus className="h-4 w-4 mr-2" />
            Legg til navn
          </Button>
        )}
        {listNames && listNames.length > 0 && (
          <Button 
            onClick={onCreatePoll}
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
  );
};

export default ListHeader;
