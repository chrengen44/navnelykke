
import { BabyName, babyNames } from "@/data";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface RelatedNamesProps {
  currentName: BabyName;
  limit?: number;
}

const RelatedNames = ({ currentName, limit = 8 }: RelatedNamesProps) => {
  // Find names with similar categories
  const findRelatedNames = () => {
    const related = babyNames
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
      
    return related;
  };

  const relatedNames = findRelatedNames();

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
