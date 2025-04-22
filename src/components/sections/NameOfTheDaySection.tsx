
import React from "react";
import { CalendarDays } from "lucide-react";
import NameOfTheDay from "@/components/NameOfTheDay";

const NameOfTheDaySection = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Dagens navn</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Utforsk dagens utvalgte navn og dets betydning
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <CalendarDays className="h-6 w-6 text-purple-500" />
                </div>
                <h2 className="text-2xl font-bold">Dagens navn</h2>
              </div>
              <NameOfTheDay />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NameOfTheDaySection;
