
import { BabyName } from "@/data/types";
import { Badge } from "@/components/ui/badge";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import FavoriteButton from "@/components/FavoritesButton";

interface NameHeaderProps {
  name: BabyName;
  getGenderLabel: () => string;
  getGenderColorClass: () => string;
}

const NameHeader = ({ name, getGenderLabel, getGenderColorClass }: NameHeaderProps) => {
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
