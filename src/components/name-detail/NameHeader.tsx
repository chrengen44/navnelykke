
import { BabyName } from "@/data/types";
import { Badge } from "@/components/ui/badge";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import FavoriteButton from "@/components/FavoritesButton";
import { toast } from "sonner";

interface NameHeaderProps {
  name: BabyName;
  getGenderLabel: () => string;
  getGenderColorClass: () => string;
}

const NameHeader = ({ name, getGenderLabel, getGenderColorClass }: NameHeaderProps) => {
  const handleShare = async () => {
    const shareData = {
      title: `${name.name} - Navnelykke`,
      text: `Les mer om navnet ${name.name} og dets betydning`,
      url: `${window.location.origin}/navn/${name.id}`
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        toast.success("Lenke kopiert til utklippstavlen");
      }
    } catch (error) {
      console.error("Error sharing:", error);
      toast.error("Kunne ikke dele navnet");
    }
  };

  return (
    <div className={`py-12 ${getGenderColorClass()}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-start">
            <div>
              <Badge variant="outline" className="mb-2 bg-white/70 backdrop-blur-sm">
                {getGenderLabel()}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{name.name}</h1>
              <p className="text-xl text-gray-700">{name.meaning}</p>
            </div>
            <div className="flex gap-2">
              <FavoriteButton nameId={name.id} />
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white/70 backdrop-blur-sm text-gray-500"
                onClick={handleShare}
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameHeader;
