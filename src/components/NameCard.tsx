
import { BabyName } from "@/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FavoriteButton from "./FavoritesButton";

interface NameCardProps {
  name: BabyName;
  showDetails?: boolean;
}

const NameCard = ({ name, showDetails = false }: NameCardProps) => {
  const getGenderColorClass = () => {
    switch (name.gender) {
      case "boy":
        return "bg-babyblue text-blue-800";
      case "girl":
        return "bg-babypink text-pink-800";
      case "unisex":
        return "bg-babypurple text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getGenderLabel = () => {
    switch (name.gender) {
      case "boy":
        return "Gutt";
      case "girl":
        return "Jente";
      case "unisex":
        return "Unisex";
      default:
        return "";
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md h-full flex flex-col">
      <CardContent className="p-0 flex-1 flex flex-col">
        <div className={`p-4 ${getGenderColorClass()} flex justify-between items-start`}>
          <div>
            <h3 className="text-xl font-bold">{name.name}</h3>
            <Badge variant="outline" className="mt-1 bg-white/50 backdrop-blur-sm">
              {getGenderLabel()}
            </Badge>
          </div>
          <FavoriteButton 
            nameId={name.id}
          />
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <div className="mb-3">
            <p className="text-gray-600">{name.meaning}</p>
            <p className="text-sm text-gray-500 mt-1">Opprinnelse: {name.origin}</p>
          </div>

          {showDetails && (
            <div className="mt-auto">
              <div className="flex flex-wrap gap-1 mb-3">
                {name.categories.map((category) => (
                  <Badge key={category} variant="secondary" className="text-xs">
                    {category}
                  </Badge>
                ))}
              </div>
              
              <div className="text-sm text-gray-500">
                <div className="flex justify-between items-center">
                  <span>Popularitet:</span>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-pink-500 h-2 rounded-full"
                      style={{ width: `${name.popularity}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NameCard;
