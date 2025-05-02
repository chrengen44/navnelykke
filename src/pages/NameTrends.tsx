
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NameTrendExplorer from '@/components/name-trends/NameTrendExplorer';
import PopularityTrends from '@/components/name-trends/PopularityTrends';
import TrendingNamesCard from '@/components/name-trends/TrendingNamesCard';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const NameTrends = () => {
  const [gender, setGender] = useState<'girl' | 'boy'>('girl');
  
  const handleGenderChange = (value: string | undefined) => {
    if (value && (value === 'girl' || value === 'boy')) {
      setGender(value);
    }
  };
  
  return (
    <Layout>
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Navnetrender i Norge</h1>
            <p className="text-gray-600 mt-2">
              Utforsk hvordan populære navn har endret seg over tid, basert på data fra Statistisk Sentralbyrå.
            </p>
          </div>
          
          <Tabs defaultValue="explorer" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="explorer">Popularitetsrangering</TabsTrigger>
              <TabsTrigger value="insights">Interessante trender</TabsTrigger>
            </TabsList>
            
            <TabsContent value="explorer" className="space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Popularitetsrangering for navn i Norge</h2>
                <p className="text-gray-600 mb-6">
                  Se hvordan jente- og guttenavn rangerer i popularitet over tid og sammenlign trender fra 2013 til 2024.
                </p>
                <NameTrendExplorer />
              </Card>
            </TabsContent>
            
            <TabsContent value="insights" className="space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Trender og innsikt</h2>
                <p className="text-gray-600 mb-6">
                  Oppdagelser og analyser av navnetrender i Norge de siste årene.
                </p>
                
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium">Velg kjønn</h3>
                  <ToggleGroup type="single" value={gender} onValueChange={handleGenderChange}>
                    <ToggleGroupItem value="girl" aria-label="Jentenavn">
                      Jentenavn
                    </ToggleGroupItem>
                    <ToggleGroupItem value="boy" aria-label="Guttenavn">
                      Guttenavn
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-medium mb-3">Popularitetsendringer over tid</h3>
                    <p className="text-gray-600 mb-4">
                      Se hvordan populariteten til de mest populære {gender === 'girl' ? 'jente' : 'gutte'}navnene har utviklet seg fra 2013 til 2024.
                    </p>
                    <PopularityTrends gender={gender} />
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TrendingNamesCard type="rising" gender={gender} />
                    <TrendingNamesCard type="falling" gender={gender} />
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 text-sm text-gray-500">
            <p>Kilde: Statistisk sentralbyrå (SSB), 2024</p>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default NameTrends;
