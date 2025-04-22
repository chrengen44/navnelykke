
import React from "react";
import { CalendarDays, Sparkles } from "lucide-react";
import NameOfTheDay from "@/components/NameOfTheDay";

const NameOfTheDaySection = () => {
  return (
    <section className="py-12 relative bg-gradient-to-b from-purple-50 to-white overflow-hidden">
      {/* Decorative background shape */}
      <div className="absolute top-[-70px] right-[-60px] w-[230px] h-[230px] bg-purple-100 rounded-full opacity-40 blur-2xl z-0"></div>
      <div className="absolute bottom-0 left-[-50px] w-[120px] h-[120px] bg-pink-100 rounded-full opacity-35 blur-2xl z-0"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 flex items-center justify-center gap-2">
            <Sparkles className="h-7 w-7 text-purple-400 animate-fade-in" />
            Dagens navn
            <Sparkles className="h-7 w-7 text-pink-300 animate-fade-in" />
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Utforsk dagens utvalgte navn, betydning og spennende fakta.
          </p>
        </div>
        <div className="max-w-2xl mx-auto animate-fade-in">
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
