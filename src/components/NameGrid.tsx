
import { BabyName } from "@/data";
import NameCard from "./NameCard";
import { Link } from "react-router-dom";

interface NameGridProps {
  names: BabyName[];
  showDetails?: boolean;
  emptyMessage?: string;
  linkToDetail?: boolean;
}

const NameGrid = ({ 
  names, 
  showDetails = false, 
  emptyMessage = "Ingen navn funnet", 
  linkToDetail = true 
}: NameGridProps) => {
  if (!names.length) {
    return <div className="text-center py-8 text-gray-500">{emptyMessage}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {names.map((name) => (
        <div key={name.id}>
          {linkToDetail ? (
            <Link to={`/navn/${name.id}`} className="block h-full">
              <NameCard name={name} showDetails={showDetails} />
            </Link>
          ) : (
            <NameCard name={name} showDetails={showDetails} />
          )}
        </div>
      ))}
    </div>
  );
};

export default NameGrid;
