
import { Input } from "@/components/ui/input";
import { BabyName } from "@/data/types";
import NameCard from "./NameCard";

interface SearchTabContentProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearching: boolean;
  searchResults: BabyName[] | undefined;
  selectedNames: number[];
  isNameInList: (nameId: number) => boolean;
  toggleName: (nameId: number) => void;
}

const SearchTabContent = ({
  searchQuery,
  setSearchQuery,
  isSearching,
  searchResults,
  selectedNames,
  isNameInList,
  toggleName
}: SearchTabContentProps) => {
  return (
    <div className="space-y-4">
      <Input
        placeholder="Søk etter navn..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      
      {isSearching ? (
        <div className="text-center py-4">
          <p>Søker...</p>
        </div>
      ) : searchResults && searchResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {searchResults.map((name) => (
            <NameCard
              key={name.id}
              name={name}
              isSelected={selectedNames.includes(name.id)}
              isInList={isNameInList(name.id)}
              onToggle={() => toggleName(name.id)}
            />
          ))}
        </div>
      ) : searchQuery.length >= 2 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Ingen navn funnet.</p>
        </div>
      ) : null}
    </div>
  );
};

export default SearchTabContent;
