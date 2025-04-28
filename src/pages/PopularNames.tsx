
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { BabyName } from "@/data/types";
import { getPopularNames } from "@/data";
import NameGrid from "@/components/NameGrid";
import AdSpace from "@/components/AdSpace";
import { GenderFilter } from "@/components/search/filters/GenderFilter";
import { Helmet } from "react-helmet-async";
import { useStructuredData } from "@/hooks/useStructuredData";
import { Layout } from "@/components/Layout";
import StructuredData from "@/components/SEO/StructuredData";

const PopularNames = () => {
  const [names, setNames] = useState<BabyName[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const { getArticleData, getBreadcrumbData, getListData } = useStructuredData();

  const gender = searchParams.get("gender") || "all";

  // Handle filter changes
  const handleFilterChange = (key: string, value: string) => {
    setSearchParams(prev => {
      if (value === "all") {
        prev.delete(key);
      } else {
        prev.set(key, value);
      }
      return prev;
    });
  };

  useEffect(() => {
    const fetchNames = async () => {
      setLoading(true);
      try {
        // Convert string to expected gender type or undefined for "all"
        const genderParam = gender === "all" ? undefined : 
          (gender === "boy" || gender === "girl" || gender === "unisex" ? gender : undefined);
        
        const fetchedNames = await getPopularNames(genderParam);
        setNames(fetchedNames);
      } catch (error) {
        console.error("Error fetching popular names:", error);
        setNames([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNames();
  }, [gender]);

  const articleData = getArticleData(
    "Populære navn i Norge",
    "Se hvilke babynavn som er mest populære i Norge akkurat nå",
    "/populære-navn"
  );
  
  const breadcrumbData = getBreadcrumbData([
    { name: "Hjem", url: "/" },
    { name: "Populære navn", url: "/populære-navn" }
  ]);
  
  // Fix the list data structure to match expected format
  const listData = names.length > 0 ? getListData(
    names.map((name, index) => ({
      name: name.name,
      position: index + 1,
      // Change url to item to match expected interface
      item: `/navn/${name.id}`
    }))
  ) : null;

  // Prepare all structured data as an array
  const structuredDataArray = [articleData, breadcrumbData];
  if (listData) {
    structuredDataArray.push(listData);
  }

  return (
    <Layout>
      <Helmet>
        <title>Populære navn i Norge | Navnelykke</title>
        <meta name="description" content="Se hvilke babynavn som er mest populære i Norge akkurat nå" />
      </Helmet>
      
      {/* Use the updated StructuredData component with all data in an array */}
      <StructuredData data={structuredDataArray} />
      
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
