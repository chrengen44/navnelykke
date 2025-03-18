
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Crown, 
  TrendingUp, 
  Gem, 
  MountainSnow, 
  Anchor, 
  Book, 
  Globe, 
  Flower, 
  LucideIcon 
} from "lucide-react";

interface CategoryCardProps {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const CategoryCard = ({ id, title, description, icon }: CategoryCardProps) => {
  const getIcon = (): LucideIcon => {
    switch (icon) {
      case "crown":
        return Crown;
      case "trending-up":
        return TrendingUp;
      case "gem":
        return Gem;
      case "mountain-snow":
        return MountainSnow;
      case "anchor":
        return Anchor;
      case "book":
        return Book;
      case "globe":
        return Globe;
      case "flower":
        return Flower;
      default:
        return Crown;
    }
  };

  const IconComponent = getIcon();

  const getBackgroundColor = () => {
    switch (icon) {
      case "crown":
        return "bg-babyyellow";
      case "trending-up":
        return "bg-babypink";
      case "gem":
        return "bg-babypurple";
      case "mountain-snow":
        return "bg-babyblue";
      case "anchor":
        return "bg-babypeach";
      case "book":
        return "bg-babygreen";
      case "globe":
        return "bg-babyblue";
      case "flower":
        return "bg-babypink";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <Link to={`/kategori/${id}`} className="block h-full">
      <Card className={`h-full hover:shadow-md transition-shadow ${getBackgroundColor()}`}>
        <CardContent className="p-6 flex flex-col h-full">
          <div className="mb-4 bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-sm">
            <IconComponent className="w-6 h-6 text-gray-800" />
          </div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-700 text-sm mt-auto">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
