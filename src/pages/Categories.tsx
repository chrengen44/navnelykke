import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getOriginCounts } from "@/integrations/supabase/analytics-queries";

const Categories = () => {
  const [originCounts, setOriginCounts] = useState<{origin: string, name_count: number}[]>([]);

  useEffect(() => {
    const fetchOriginCounts = async () => {
      const counts = await getOriginCounts();
      setOriginCounts(counts);
    };

    fetchOriginCounts();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Navn etter opprinnelse</h1>
        <p className="text-gray-600 mb-8">Utforsk navn basert på deres geografiske og kulturelle opprinnelse.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {originCounts.map((origin) => (
            <Link key={origin.origin} to={`/opprinnelse/${origin.origin}`}>
              <Card className="hover:shadow-md transition-shadow duration-200">
                <CardHeader>
                  <CardTitle>{origin.origin}</CardTitle>
                  <CardDescription>
                    {origin.name_count} navn
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">Utforsk navn fra {origin.origin}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
