
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Globe } from "lucide-react";

interface OriginCategoryCardProps {
  origin: string;
  count: number;
}

const OriginCategoryCard = ({ origin, count }: OriginCategoryCardProps) => {
  return (
    <Link to={`/opprinnelse/${encodeURIComponent(origin)}`} className="block h-full">
      <Card className="h-full hover:shadow-md transition-shadow bg-white">
        <CardContent className="p-6 flex flex-col h-full">
          <div className="mb-4 bg-babyblue rounded-full w-12 h-12 flex items-center justify-center shadow-sm">
            <Globe className="w-6 h-6 text-gray-800" />
          </div>
          <h3 className="text-lg font-semibold mb-2">{origin}</h3>
          <p className="text-gray-700 text-sm mt-auto">
            {count > 0 ? `${count} ${count === 1 ? 'navn' : 'navn'}` : 'Ingen navn ennå'}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
