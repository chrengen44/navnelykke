
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Globe, Sword, Ship, Cross, BookOpen, TreePine, Heart, Mountain, Sun } from "lucide-react";

interface OriginCategoryCardProps {
  origin: string;
  count: number;
}

const getOriginStyle = (origin: string) => {
  switch (origin.toLowerCase()) {
    case 'norse':
      return {
        icon: Sword,
        bgColor: 'bg-babypurple',
        iconColor: 'text-gray-800'
      };
    case 'scandinavian':
      return {
        icon: Ship,
        bgColor: 'bg-babyblue',
        iconColor: 'text-gray-800'
      };
    case 'hebrew':
      return {
        icon: Cross,
        bgColor: 'bg-babyyellow',
        iconColor: 'text-gray-800'
      };
    case 'greek':
      return {
        icon: BookOpen,
        bgColor: 'bg-babypeach',
        iconColor: 'text-gray-800'
      };
    case 'celtic':
      return {
        icon: TreePine,
        bgColor: 'bg-babygreen',
        iconColor: 'text-gray-800'
      };
    case 'latin':
      return {
        icon: Heart,
        bgColor: 'bg-babypink',
        iconColor: 'text-gray-800'
      };
    case 'german':
      return {
        icon: Mountain,
        bgColor: 'bg-blue-100',
        iconColor: 'text-gray-800'
      };
    case 'arabic':
      return {
        icon: Sun,
        bgColor: 'bg-amber-100',
        iconColor: 'text-gray-800'
      };
    default:
      return {
        icon: Globe,
        bgColor: 'bg-gray-100',
        iconColor: 'text-gray-800'
      };
  }
};

const OriginCategoryCard = ({ origin, count }: OriginCategoryCardProps) => {
  const style = getOriginStyle(origin);
  const IconComponent = style.icon;

  return (
    <Link to={`/opprinnelse/${encodeURIComponent(origin)}`} className="block h-full">
      <Card className="h-full hover:shadow-md transition-shadow bg-white hover:scale-105 transform duration-200">
        <CardContent className="p-6 flex flex-col h-full">
          <div className={`mb-4 ${style.bgColor} rounded-full w-12 h-12 flex items-center justify-center shadow-sm`}>
            <IconComponent className={`w-6 h-6 ${style.iconColor}`} />
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
