
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wrench, ChevronRight, Puzzle, Users } from "lucide-react";

const ToolsSection = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Navneverktøy</h2>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-pink-50 rounded-lg">
                <Wrench className="h-6 w-6 text-pink-500" />
              </div>
              <h2 className="text-2xl font-bold">Navneverktøy</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-5 hover:bg-gray-100 transition-colors">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-pink-500" />
                  Navnekombinator
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Kombiner to navn for å skape et unikt navn
                </p>
                <Button asChild size="sm" variant="outline" className="w-full">
                  <Link to="/verktoy">Prøv nå</Link>
                </Button>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-5 hover:bg-gray-100 transition-colors">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Puzzle className="h-5 w-5 text-blue-500" />
                  Navnequiz
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Finn navn som passer din stil og preferanser
                </p>
                <Button asChild size="sm" variant="outline" className="w-full">
                  <Link to="/verktoy?tab=quiz">Start quiz</Link>
                </Button>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-5 hover:bg-gray-100 transition-colors">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-500" />
                  Søskennavn
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Find harmoniske navn som passer sammen
                </p>
                <Button asChild size="sm" variant="outline" className="w-full">
                  <Link to="/verktoy?tab=sibling">Finn søskennavn</Link>
                </Button>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-5 hover:bg-gray-100 transition-colors opacity-50 cursor-not-allowed">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-gray-400" />
                  Kommende verktøy
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Nytt navneverktøy kommer snart!
                </p>
                <Button size="sm" variant="outline" className="w-full" disabled>
                  Kommer snart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
