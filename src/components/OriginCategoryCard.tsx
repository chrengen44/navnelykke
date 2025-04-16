
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Globe, Flag, Anchor, MapPin, Mountain } from "lucide-react";

interface OriginCategoryCardProps {
  origin: string;
  count: number;
}

const OriginCategoryCard = ({ origin, count }: OriginCategoryCardProps) => {
  // Function to determine icon and colors based on origin
  const getOriginStyles = (origin: string) => {
    const lowercaseOrigin = origin.toLowerCase();
    
    switch (lowercaseOrigin) {
      case 'norse':
        return { 
          icon: <Anchor className="w-6 h-6 text-gray-800" />,
          bgColor: "bg-babypurple",
          borderColor: "border-purple-300"
        };
      case 'scandinavian':
        return { 
          icon: <Mountain className="w-6 h-6 text-gray-800" />,
          bgColor: "bg-babyblue",
          borderColor: "border-blue-300" 
        };
      case 'hebrew':
        return { 
          icon: <Flag className="w-6 h-6 text-gray-800" />,
          bgColor: "bg-babypeach",
          borderColor: "border-orange-300" 
        };
      case 'greek':
        return { 
          icon: <MapPin className="w-6 h-6 text-gray-800" />,
          bgColor: "bg-babygreen",
          borderColor: "border-green-300"
        };
      default:
        return { 
          icon: <Globe className="w-6 h-6 text-gray-800" />,
          bgColor: "bg-babyyellow",
          borderColor: "border-yellow-300"
        };
    }
  };

  const { icon, bgColor, borderColor } = getOriginStyles(origin);

  return (
    <Link to={`/opprinnelse/${encodeURIComponent(origin)}`} className="block h-full">
      <Card className={`h-full hover:shadow-md transition-shadow border-2 ${borderColor} bg-white`}>
        <CardContent className="p-6 flex flex-col h-full">
          <div className={`mb-4 ${bgColor} rounded-full w-12 h-12 flex items-center justify-center shadow-sm`}>
            {icon}
          </div>
          <h3 className="text-lg font-semibold mb-2">{origin}</h3>
          <p className="text-gray-700 text-sm mt-auto">
            {count > 0 ? `${count} ${count === 1 ? 'navn' : 'navn'}` : 'Ingen navn ennå'}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default OriginCategoryCard;
