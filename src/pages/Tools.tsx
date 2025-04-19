
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NameCombinator from "@/components/tools/NameCombinator";
import NameQuiz from "@/components/tools/NameQuiz";
import SiblingNameFinder from "@/components/tools/SiblingNameFinder";

const Tools: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("combinator");
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Navneverktøy</h1>
        <p className="text-gray-600 mb-8">
          Utforsk våre interaktive verktøy for å finne det perfekte navnet til barnet ditt
        </p>
        
        <Tabs 
          defaultValue="combinator" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="combinator">Navnekombinator</TabsTrigger>
            <TabsTrigger value="quiz">Navnequiz</TabsTrigger>
            <TabsTrigger value="sibling">Søskennavn</TabsTrigger>
          </TabsList>
          
          <TabsContent value="combinator">
            <NameCombinator />
          </TabsContent>
          
          <TabsContent value="quiz">
            <NameQuiz />
          </TabsContent>
          
          <TabsContent value="sibling">
            <SiblingNameFinder />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Tools;
