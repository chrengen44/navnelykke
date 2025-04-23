
import { BabyName } from "@/data/types";
import NameGrid from "@/components/NameGrid";

interface SearchResultsProps {
  loading: boolean;
  results: BabyName[];
  query: string;
}

const SearchResults = ({ loading, results, query }: SearchResultsProps) => {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <p className="text-gray-600">
          {`Fant ${results.length} ${results.length === 1 ? "resultat" : "resultater"} for søket ditt.`}
        </p>
      </div>
      
      <NameGrid 
        names={results} 
        showDetails={true}
        emptyMessage={query ? `Ingen navn funnet for "${query}". Prøv et annet søkeord eller juster filtrene.` : "Skriv inn et søkeord for å finne babynavn."}
      />
    </div>
  );
};

export default SearchResults;
