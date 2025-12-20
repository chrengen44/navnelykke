import { BabyName } from "@/data/types";
import NameGrid from "@/components/NameGrid";
import { NameGridSkeleton } from "@/components/skeletons";

interface SearchResultsProps {
  loading: boolean;
  results: BabyName[];
  query: string;
}

const SearchResults = ({ loading, results, query }: SearchResultsProps) => {
  if (loading) {
    return (
      <div>
        <div className="mb-6">
          <div className="h-5 w-48 bg-muted rounded animate-pulse" />
        </div>
        <NameGridSkeleton count={8} showDetails />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <p className="text-muted-foreground">
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
