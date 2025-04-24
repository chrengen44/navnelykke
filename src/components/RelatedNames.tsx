import { useState, useEffect } from "react";
import { BabyName } from "@/data";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { fetchAllNames } from "@/integrations/supabase/name-queries";

interface RelatedNamesProps {
  currentName: BabyName;
  limit?: number;
}

const RelatedNames = ({ currentName, limit = 8 }: RelatedNamesProps) => {
  const [relatedNames, setRelatedNames] = useState<BabyName[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const findRelatedNames = async () => {
      setLoading(true);
      try {
        // Get all names to find related ones
        const allNames = await fetchAllNames();
        
        const related = allNames
          .filter(name => 
            name.id !== currentName.id && 
            name.categories.some(category => currentName.categories.includes(category))
          )
          .sort((a, b) => {
            // Count matching categories
            const aMatches = a.categories.filter(cat => currentName.categories.includes(cat)).length;
            const bMatches = b.categories.filter(cat => currentName.categories.includes(cat)).length;
            
            // Sort by number of matching categories, then by popularity
            return bMatches - aMatches || b.popularity - a.popularity;
          })
          .slice(0, limit);
          
        setRelatedNames(related);
      } catch (error) {
        console.error("Error finding related names:", error);
        setRelatedNames([]);
      } finally {
        setLoading(false);
      }
    };

    findRelatedNames();
  }, [currentName, limit]);

  if (loading) {
    return <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Lignende navn</h3>
      <div className="flex justify-center">
        <div className="animate-pulse bg-gray-200 h-8 w-full rounded"></div>
      </div>
    </div>;
  }

  if (relatedNames.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Lignende navn</h3>
      <div className="flex flex-wrap gap-2">
        {relatedNames.map(name => (
          <Link key={name.id} to={`/navn/${name.id}`}>
            <Badge variant="secondary" className="hover:bg-gray-200 cursor-pointer py-1.5">
              {name.name}
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedNames;
