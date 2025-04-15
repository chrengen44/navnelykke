
import { BabyName } from "@/data/types";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface NameInfoProps {
  name: BabyName;
  getGenderLabel: () => string;
}

const NameInfo = ({ name, getGenderLabel }: NameInfoProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Om navnet</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-700">Opprinnelse</h3>
            <p>{name.origin}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-700">Betydning</h3>
            <p>{name.meaning}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-700">Popularitet</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-pink-500 h-2.5 rounded-full"
                style={{ width: `${name.popularity}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {name.popularity > 80
                ? "Svært populært"
                : name.popularity > 60
                ? "Populært"
                : name.popularity > 40
                ? "Moderat populært"
                : name.popularity > 20
                ? "Mindre vanlig"
                : "Sjeldent"}
            </p>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Kategorier</h2>
        <div className="flex flex-wrap gap-2 mb-6">
          {name.categories.map(category => (
            <Link key={category} to={`/kategori/${category}`}>
              <Badge className="px-3 py-1.5 text-base bg-gray-100 hover:bg-gray-200 text-gray-800 cursor-pointer">
                {category}
              </Badge>
            </Link>
          ))}
        </div>
        
        <h2 className="text-xl font-semibold mb-4 mt-8">Detaljer</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Kjønn:</span>
            <span className="font-medium">{getGenderLabel()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Lengde:</span>
            <span className="font-medium capitalize">{name.length === "short" ? "Kort" : name.length === "medium" ? "Middels" : "Langt"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Forbokstav:</span>
            <span className="font-medium">{name.firstLetter}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameInfo;
