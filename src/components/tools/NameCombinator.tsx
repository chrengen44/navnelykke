
import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { babyNames } from "@/data";
import { BabyName } from "@/data/types";
import { Loader } from "lucide-react";

const NameCombinator: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [combinations, setCombinations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [useDatabaseNames, setUseDatabaseNames] = useState(false);

  // Get all names from database for auto-suggestions
  const allNameStrings = useMemo(() => 
    babyNames.map(name => name.name)
  , []);
  
  const generateCombinations = () => {
    if (!firstName && !secondName) return;
    setLoading(true);
    setTimeout(() => {
      const results: string[] = [];
      if (useDatabaseNames) {
        const firstNameChars = firstName.toLowerCase().split('');
        const secondNameChars = secondName.toLowerCase().split('');
        const compatibleNames = babyNames.filter(name => {
          const nameFirstChar = name.name.toLowerCase()[0];
          return firstNameChars.includes(nameFirstChar) || secondNameChars.includes(nameFirstChar);
        }).map(name => name.name).slice(0, 8);
        results.push(...compatibleNames);
      }
      if (firstName && secondName) {
        const combo1 = firstName.substring(0, Math.ceil(firstName.length / 2)) + 
                     secondName.substring(Math.floor(secondName.length / 2));
        const combo2 = secondName.substring(0, Math.ceil(secondName.length / 2)) + 
                     firstName.substring(Math.floor(firstName.length / 2));
        const combo3 = firstName[0] + secondName.substring(1);
        const combo4 = secondName[0] + firstName.substring(1);
        results.push(
          capitalizeFirstLetter(combo1),
          capitalizeFirstLetter(combo2),
          capitalizeFirstLetter(combo3),
          capitalizeFirstLetter(combo4)
        );
      }
      setCombinations(Array.from(new Set(results))); // Remove duplicates
      setLoading(false);
    }, 600);
  };
  
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Card className="bg-white shadow-md border-0">
      <CardContent className="p-6 md:p-8 flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-1">Navnekombinator</h2>
          <p className="text-gray-600 mb-2 text-sm">
            Kombiner to navn for å skape et unikt navn til barnet ditt, eller finn navn 
            som passer sammen som første- og mellomnavn.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              Første navn
            </label>
            <Input
              id="firstName"
              placeholder="F.eks. Maria"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full"
              list="firstNameList"
              autoComplete="off"
            />
            <datalist id="firstNameList">
              {allNameStrings.map((name, i) => (
                <option key={`first-${i}`} value={name} />
              ))}
            </datalist>
          </div>
          <div className="flex-1">
            <label htmlFor="secondName" className="block text-sm font-medium text-gray-700 mb-1">
              Andre navn
            </label>
            <Input
              id="secondName"
              placeholder="F.eks. Johan"
              value={secondName}
              onChange={(e) => setSecondName(e.target.value)}
              className="w-full"
              list="secondNameList"
              autoComplete="off"
            />
            <datalist id="secondNameList">
              {allNameStrings.map((name, i) => (
                <option key={`second-${i}`} value={name} />
              ))}
            </datalist>
          </div>
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="checkbox" 
              className="mr-2 h-4 w-4 accent-pink-500" 
              checked={useDatabaseNames}
              onChange={() => setUseDatabaseNames(!useDatabaseNames)}
            />
            <span className="text-sm text-gray-600">
              Inkluder forslag basert på vår navnedatabase
            </span>
          </label>
        </div>
        <Button onClick={generateCombinations} className="w-full max-w-xs self-center">
          Kombiner navn
        </Button>
        <div>
          {loading ? (
            <div className="w-full py-10 flex flex-col items-center justify-center animate-fade-in">
              <Loader className="w-10 h-10 text-pink-400 animate-spin mb-2" />
              <span className="text-gray-400 text-sm">Laster forslag...</span>
            </div>
          ) : (
            combinations.length > 0 && (
              <div className="animate-fade-in">
                <h3 className="text-lg font-semibold mb-3 text-center">Navneforslag</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {combinations.map((outName, index) => {
                    // Try to get meaning if exists in our db
                    const inDb = babyNames.find(n => n.name.toLowerCase() === outName.toLowerCase());
                    return (
                      <div 
                        key={index} 
                        className="p-3 bg-gray-50 rounded-lg text-center border border-gray-100 hover:bg-pink-50 transition-colors shadow-sm flex flex-col min-h-[70px]"
                      >
                        <div className="font-medium text-pink-700 text-base">{outName}</div>
                        <div className="text-xs mt-1 text-gray-500 min-h-[28px] truncate" title={inDb?.meaning ?? ""}>
                          {inDb?.meaning}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NameCombinator;
