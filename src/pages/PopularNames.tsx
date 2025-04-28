import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPopularNames } from "@/data";
import NameGrid from "@/components/NameGrid";
import { BabyName } from "@/data/types";
import { useSearchParams } from "react-router-dom";
import AdSpace from "@/components/AdSpace";
import GenderFilter from "@/components/search/GenderFilter";
import StructuredData from "@/components/SEO/StructuredData";
import { useStructuredData } from "@/hooks/useStructuredData";
import { Layout } from "@/components/Layout";

const PopularNames = () => {
  const [names, setNames] = useState<BabyName[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const { getArticleData, getBreadcrumbData, getListData } = useStructuredData();

  const gender = searchParams.get("gender") || "all";

  useEffect(() => {
    const fetchNames = async () => {
      setLoading(true);
      try {
        const fetchedNames = await getPopularNames(gender);
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

  const structuredData = [
    getArticleData(
      "Populære navn i Norge",
      "Se hvilke babynavn som er mest populære i Norge akkurat nå",
      "/populære-navn"
    ),
    getBreadcrumbData([
      { name: "Hjem", url: "/" },
      { name: "Populære navn", url: "/populære-navn" }
    ]),
    names.length > 0 && getListData(
      names.map((name, index) => ({
        name: name.name,
        url: `/navn/${name.id}`,
        position: index + 1
      }))
    )
  ].filter(Boolean);

  return (
    <Layout>
      {structuredData.map((data, index) => (
        <StructuredData key={index} data={data} />
      ))}
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
              <GenderFilter />

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
