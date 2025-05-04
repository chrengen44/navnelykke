
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Globe, Sword, Ship, Cross, BookOpen, TreePine, Heart, Mountain, Sun, Music, Star, Coffee, Flag, Map, Crown } from "lucide-react";

interface OriginCategoryCardProps {
  origin: string;
  count: number;
}

const getOriginStyle = (origin: string) => {
  const originLower = origin.toLowerCase();
  switch (originLower) {
    case 'norse':
      return {
        icon: Sword,
        bgColor: 'bg-babypurple',
        textColor: 'text-gray-800'
      };
    case 'scandinavian':
      return {
        icon: Ship,
        bgColor: 'bg-babyblue',
        textColor: 'text-gray-800'
      };
    case 'hebrew':
      return {
        icon: Cross,
        bgColor: 'bg-babyyellow',
        textColor: 'text-gray-800'
      };
    case 'greek':
      return {
        icon: BookOpen,
        bgColor: 'bg-babypeach',
        textColor: 'text-gray-800'
      };
    case 'celtic':
      return {
        icon: TreePine,
        bgColor: 'bg-babygreen',
        textColor: 'text-gray-800'
      };
    case 'latin':
      return {
        icon: Heart,
        bgColor: 'bg-babypink',
        textColor: 'text-gray-800'
      };
    case 'german':
      return {
        icon: Mountain,
        bgColor: 'bg-blue-100',
        textColor: 'text-gray-800'
      };
    case 'arabic':
      return {
        icon: Sun,
        bgColor: 'bg-amber-100',
        textColor: 'text-gray-800'
      };
    case 'french':
      return {
        icon: Crown,
        bgColor: 'bg-red-100',
        textColor: 'text-gray-800'
      };
    case 'irish':
      return {
        icon: Music,
        bgColor: 'bg-green-100',
        textColor: 'text-gray-800'
      };
    case 'italian':
      return {
        icon: Star,
        bgColor: 'bg-indigo-100',
        textColor: 'text-gray-800'
      };
    case 'turkish':
      return {
        icon: Coffee,
        bgColor: 'bg-orange-100',
        textColor: 'text-gray-800'
      };
    case 'polish':
      return {
        icon: Flag,
        bgColor: 'bg-pink-100',
        textColor: 'text-gray-800'
      };
    case 'russian':
      return {
        icon: Map,
        bgColor: 'bg-purple-100',
        textColor: 'text-gray-800'
      };
    default:
      return {
        icon: Globe,
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-800'
      };
  }
};

const OriginCategoryCard = ({ origin, count }: OriginCategoryCardProps) => {
  // Ensure origin is always a string
  const safeOrigin = origin || '';
  const style = getOriginStyle(safeOrigin);
  const IconComponent = style.icon;

  return (
    <Link to={`/opprinnelse/${encodeURIComponent(safeOrigin)}`} className="block h-full">
      <Card className={`h-full hover:shadow-md transition-shadow ${style.bgColor} hover:scale-105 transform duration-200`}>
        <CardContent className="p-6 flex flex-col h-full">
          <div className="mb-4 bg-white/50 rounded-full w-12 h-12 flex items-center justify-center shadow-sm">
            <IconComponent className={`w-6 h-6 ${style.textColor}`} />
          </div>
          <h3 className={`text-lg font-semibold mb-2 ${style.textColor}`}>{safeOrigin}</h3>
          <p className={`${style.textColor} text-sm mt-auto opacity-75`}>
            {count > 0 ? `${count} ${count === 1 ? 'navn' : 'navn'}` : 'Ingen navn ennå'}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default OriginCategoryCard;
