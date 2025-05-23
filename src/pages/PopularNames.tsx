
import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { BabyName } from "@/data/types";
import { fetchPopularNames } from "@/integrations/supabase/popular-names";
import NameGrid from "@/components/NameGrid";
import AdSpace from "@/components/AdSpace";
import { GenderFilter } from "@/components/search/filters/GenderFilter";
import { useStructuredData } from "@/hooks/useStructuredData";
import { Layout } from "@/components/Layout";
import StructuredData from "@/components/SEO/StructuredData";
import { toast } from "sonner";

const PopularNames = () => {
  const [names, setNames] = useState<BabyName[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { getArticleData, getBreadcrumbData, getListData } = useStructuredData();

  const gender = searchParams.get("gender") || "all";

  // Handle filter changes with memoized callback
  const handleFilterChange = useCallback((key: string, value: string) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      if (value === "all") {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
      return newParams;
    });
  }, [setSearchParams]);

  // Fetch names with error handling
  useEffect(() => {
    const fetchNames = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Convert string to expected gender type or undefined for "all"
        const genderParam = gender === "all" ? undefined : 
          (gender === "boy" || gender === "girl" || gender === "unisex" ? gender : undefined);
        
        const fetchedNames = await fetchPopularNames(genderParam);
        setNames(fetchedNames || []);
      } catch (error) {
        console.error("Error fetching popular names:", error);
        setError("Kunne ikke laste populære navn. Vennligst prøv igjen senere.");
        // Use toast.error safely without arguments instead of potentially causing issues
        try {
          toast.error("Kunne ikke laste populære navn");
        } catch (toastError) {
          console.error("Toast error:", toastError);
        }
        setNames([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNames();
  }, [gender]);

  // Set page metadata
  useEffect(() => {
    document.title = "Populære navn i Norge | Navnelykke";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', "Se hvilke babynavn som er mest populære i Norge akkurat nå");
    
    return () => {
      document.title = "Navnelykke"; // Reset to default
    };
  }, []);

  // Prepare SEO data with memoization
  const articleData = useMemo(() => 
    getArticleData(
      "Populære navn i Norge",
      "Se hvilke babynavn som er mest populære i Norge akkurat nå",
      "/populære-navn"
    ),
    [getArticleData]
  );
  
  const breadcrumbData = useMemo(() => 
    getBreadcrumbData([
      { name: "Hjem", url: "/" },
      { name: "Populære navn", url: "/populære-navn" }
    ]),
    [getBreadcrumbData]
  );
  
  // Create list data only if we have names
  const listItems = useMemo(() => 
    names.length > 0 
      ? names.map((name, index) => ({
          name: name.name,
          position: index + 1,
          item: `/navn/${name.id}`
        }))
      : [],
    [names]
  );
  
  const listData = useMemo(() => 
    names.length > 0 ? getListData(listItems) : null,
    [names, listItems, getListData]
  );

  // Prepare all structured data as an array and filter out any nullish values
  const structuredDataArray = useMemo(() => 
    [articleData, breadcrumbData, listData].filter(Boolean),
    [articleData, breadcrumbData, listData]
  );

  return (
    <Layout>
      {structuredDataArray.length > 0 && (
        <StructuredData data={structuredDataArray} />
      )}
      
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <div className="bg-gradient-to-br from-babyblue via-white to-babypink py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Populære navn</h1>
                <p className="text-lg text-gray-700">
                  Se hvilke babynavn som er mest populære i Norge akkurat nå
                </p>
              </div>
            </div>
          </div>

          <section className="py-8">
            <div className="container mx-auto px-4">
              <GenderFilter onFilterChange={handleFilterChange} />

              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200 inline-block">
                    <p className="text-red-700">{error}</p>
                    <button 
                      onClick={() => window.location.reload()} 
                      className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-md transition-colors"
                    >
                      Last inn på nytt
                    </button>
                  </div>
                </div>
              ) : (
                <NameGrid
                  names={names}
                  showDetails={true}
                  emptyMessage="Ingen populære navn funnet for det valgte kjønnet."
                />
              )}

              <div className="mt-8">
                <AdSpace type="horizontal" />
              </div>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
};

export default PopularNames;
