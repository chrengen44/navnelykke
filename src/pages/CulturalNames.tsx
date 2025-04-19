
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { getBiblicalNames, getChristianNames, getJewishNames } from "@/data/religiousNames";
import NameGrid from "@/components/NameGrid";

const CulturalNames: React.FC = () => {
  const [activeTab, setActiveTab] = useState("religious");
  const [religiousCategory, setReligiousCategory] = useState("christian");
  
  const biblicalNames = getBiblicalNames();
  const christianNames = getChristianNames();
  const jewishNames = getJewishNames();
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Kulturelle og religiøse navn</h1>
        <p className="text-gray-600 mb-8">
          Utforsk navn fra forskjellige kulturer og religiøse tradisjoner
        </p>
        
        <Tabs 
          defaultValue="religious" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full mb-8"
        >
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="religious">Religiøse navn</TabsTrigger>
            <TabsTrigger value="cultural">Kulturelle navn</TabsTrigger>
          </TabsList>
          
          <TabsContent value="religious">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Religiøse navn</h2>
              <p className="text-gray-600 mb-6">
                Finn navn med historie og betydning fra ulike religiøse tradisjoner
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <button 
                  className={`px-4 py-2 rounded-full text-sm ${religiousCategory === "christian" ? "bg-pink-500 text-white" : "bg-gray-100"}`}
                  onClick={() => setReligiousCategory("christian")}
                >
                  Kristne navn
                </button>
                <button 
                  className={`px-4 py-2 rounded-full text-sm ${religiousCategory === "biblical" ? "bg-pink-500 text-white" : "bg-gray-100"}`}
                  onClick={() => setReligiousCategory("biblical")}
                >
                  Bibelske navn
                </button>
                <button 
                  className={`px-4 py-2 rounded-full text-sm ${religiousCategory === "jewish" ? "bg-pink-500 text-white" : "bg-gray-100"}`}
                  onClick={() => setReligiousCategory("jewish")}
                >
                  Jødiske navn
                </button>
              </div>
              
              {religiousCategory === "christian" && (
                <NameGrid names={christianNames} emptyMessage="Ingen kristne navn funnet" />
              )}
              
              {religiousCategory === "biblical" && (
                <NameGrid names={biblicalNames} emptyMessage="Ingen bibelske navn funnet" />
              )}
              
              {religiousCategory === "jewish" && (
                <NameGrid names={jewishNames} emptyMessage="Ingen jødiske navn funnet" />
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="cultural">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Kulturelle navn</h2>
              <p className="text-gray-600 mb-6">
                Utforsk navn fra ulike kulturer og tradisjoner rundt om i verden
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Nordiske navn</h3>
                    <p className="text-gray-600 mb-4">
                      Tradisjonelle navn fra nordisk kultur
                    </p>
                    <a 
                      href="/kategori/nordisk" 
                      className="text-pink-600 hover:underline"
                    >
                      Utforsk nordiske navn &rarr;
                    </a>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Vikingnavn</h3>
                    <p className="text-gray-600 mb-4">
                      Sterke navn fra vikingtiden
                    </p>
                    <a 
                      href="/kategori/vikingnavn" 
                      className="text-pink-600 hover:underline"
                    >
                      Utforsk vikingnavn &rarr;
                    </a>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Internasjonale navn</h3>
                    <p className="text-gray-600 mb-4">
                      Populære navn fra hele verden
                    </p>
                    <a 
                      href="/kategori/internasjonal" 
                      className="text-pink-600 hover:underline"
                    >
                      Utforsk internasjonale navn &rarr;
                    </a>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default CulturalNames;
