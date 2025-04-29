
import { LucideIcon, Crown, TrendingUp, Gem, MountainSnow, Anchor, Book, Globe, Flower } from "lucide-react";
import { NameCategory } from "@/data/types";

interface CategoryHeaderProps {
  category: NameCategory;
}

const CategoryHeader = ({ category }: CategoryHeaderProps) => {
  const getIcon = (): LucideIcon => {
    switch (category.icon) {
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

  return (
    <div className="bg-gradient-to-br from-babyblue via-white to-babypink py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-sm">
              <IconComponent className="w-8 h-8 text-gray-800" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{category.title}</h1>
          <p className="text-lg text-gray-700">
            {category.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategoryHeader;
