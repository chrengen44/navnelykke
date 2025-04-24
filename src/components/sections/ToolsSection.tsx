
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wrench, Puzzle, Users, Vote } from "lucide-react";

const ToolsSection = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Navneverktøy</h2>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <div className="p-6">
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
              
              <div className="bg-gray-50 rounded-lg p-5 hover:bg-gray-100 transition-colors">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Vote className="h-5 w-5 text-purple-500" />
                  Navneavstemning
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  La familie og venner stemme på deres favoritter
                </p>
                <Button asChild size="sm" variant="outline" className="w-full">
                  <Link to="/poll/create">Opprett avstemning</Link>
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

