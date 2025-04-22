
import React from "react";
import { BabyName } from "@/data/types";
import { Gift, Sparkles } from "lucide-react";

// Mocked fun facts and notable people for demo purposes.
// In a real scenario, you may enrich BabyName type or fetch from API.
const funFacts: Record<string, { fact?: string; people?: string[] }> = {
  Anna: {
    fact: "Et av verdens mest populære navn gjennom tidene – kjent i både Bibelen og kongelige historier.",
    people: ["Anna Pavlova (ballettdanser)", "Anna Netrebko (operasanger)"],
  },
  Emma: {
    fact: "Emma var Norges mest populære jentenavn mange år på rad.",
    people: ["Emma Watson (skuespiller)", "Emma Stone (skuespiller)"],
  },
  // Add mock data as needed
};

const NameFunFacts: React.FC<{ nameObj: BabyName }> = ({ nameObj }) => {
  const fallbackFact =
    "Dette navnet har en rik historie. Kanskje det blir en del av din historie også!";
  const altFact = funFacts[nameObj.name];

  return (
    <div className="bg-purple-50/60 border border-purple-100 rounded-lg p-4 flex items-start gap-3 mt-2 animate-fade-in">
      <div className="pt-1">
        <Gift className="text-purple-400 h-6 w-6" />
      </div>
      <div>
        <div className="font-semibold text-gray-700 mb-0.5 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-pink-400" /> Visste du?
        </div>
        <div className="text-gray-700 text-sm mb-0.5">{altFact?.fact || fallbackFact}</div>
        {altFact?.people && (
          <div className="mt-1 text-xs text-gray-500">
            Kjent(e) personer: {altFact.people.join(", ")}
          </div>
        )}
      </div>
    </div>
  );
};

export default NameFunFacts;
