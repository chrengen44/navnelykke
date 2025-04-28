
import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { nameCategories } from "@/data";
import CategoryCard from "@/components/CategoryCard";
import OriginCategoryCard from "@/components/OriginCategoryCard";
import { getOriginCounts } from "@/integrations/supabase/analytics-queries";
import { useStructuredData } from "@/hooks/useStructuredData";
import StructuredData from "@/components/SEO/StructuredData";

const Categories = () => {
  const [originCounts, setOriginCounts] = useState<{origin: string, name_count: number}[]>([]);
  const { getCollectionPageData, getBreadcrumbData } = useStructuredData();

  useEffect(() => {
    const fetchOriginCounts = async () => {
      const counts = await getOriginCounts();
      setOriginCounts(counts);
    };

    fetchOriginCounts();
  }, []);

  useEffect(() => {
    document.title = "Navnekategorier | Navnelykke";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', "Utforsk navn basert på ulike kategorier og stiler");
    
    return () => {
      document.title = "Navnelykke";
    };
  }, []);

  const collectionData = getCollectionPageData(
    "Navnekategorier",
    "Utforsk navn basert på ulike kategorier og stiler",
    "/kategorier"
  );
  
  const breadcrumbData = getBreadcrumbData([
    { name: "Hjem", url: "/" },
    { name: "Kategorier", url: "/kategorier" }
  ]);

  // Combine structured data in an array and filter out any nullish values
  const structuredDataArray = [collectionData, breadcrumbData].filter(Boolean);

  return (
    <Layout>
      {structuredDataArray.length > 0 && (
        <StructuredData data={structuredDataArray} />
      )}
      
      <div className="container mx-auto px-4 py-8">
        {/* Name Categories Section */}
        <section className="mb-16">
          <h1 className="text-3xl font-bold mb-6">Navnekategorier</h1>
          <p className="text-gray-600 mb-8">Utforsk navn basert på ulike kategorier og stiler.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Cultural Names Card */}
            <CategoryCard
              id="kulturelle-navn"
              title="Kulturelle navn"
              description="Utforsk navn fra forskjellige kulturer og religiøse tradisjoner"
              icon="book"
            />
            {nameCategories.map((category) => (
              <CategoryCard
                key={category.id}
                id={category.id}
                title={category.title}
                description={category.description}
                icon={category.icon}
              />
            ))}
          </div>
        </section>

        {/* Name Origins Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Navn etter opprinnelse</h2>
          <p className="text-gray-600 mb-8">Utforsk navn basert på deres geografiske og kulturelle opprinnelse.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {originCounts.map((origin) => (
              <OriginCategoryCard 
                key={origin.origin}
                origin={origin.origin}
                count={origin.name_count}
              />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Categories;
