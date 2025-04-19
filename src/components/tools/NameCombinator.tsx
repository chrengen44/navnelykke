
import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { babyNames } from "@/data";
import { BabyName } from "@/data/types";

const NameCombinator: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [combinations, setCombinations] = useState<string[]>([]);
  const [useDatabaseNames, setUseDatabaseNames] = useState(false);

  // Get all names from database for auto-suggestions
  const allNameStrings = useMemo(() => 
    babyNames.map(name => name.name)
  , []);
  
  const generateCombinations = () => {
    if (!firstName && !secondName) return;
    
    // Simple combinations for demonstration
    const results: string[] = [];
    
    // If using database names
    if (useDatabaseNames) {
      // Get a selection of names that could work well with the input
      const firstNameChars = firstName.toLowerCase().split('');
      const secondNameChars = secondName.toLowerCase().split('');
      
      // Find names starting with the same letter as firstName or secondName
      const compatibleNames = babyNames.filter(name => {
        const nameFirstChar = name.name.toLowerCase()[0];
        return firstNameChars.includes(nameFirstChar) || secondNameChars.includes(nameFirstChar);
      }).map(name => name.name).slice(0, 8);
      
      // Add these as suggestions
      results.push(...compatibleNames);
    }
    
    // Basic string combinations
    if (firstName && secondName) {
      // First half of first name + second half of second name
      const combo1 = firstName.substring(0, Math.ceil(firstName.length / 2)) + 
                     secondName.substring(Math.floor(secondName.length / 2));
      
      // First half of second name + second half of first name
      const combo2 = secondName.substring(0, Math.ceil(secondName.length / 2)) + 
                     firstName.substring(Math.floor(firstName.length / 2));
                     
      // First letters + combined rest
      const combo3 = firstName[0] + secondName.substring(1);
      const combo4 = secondName[0] + firstName.substring(1);
      
      // Capitalize first letters
      results.push(
        capitalizeFirstLetter(combo1),
        capitalizeFirstLetter(combo2),
        capitalizeFirstLetter(combo3),
        capitalizeFirstLetter(combo4)
      );
    }
    
    setCombinations(Array.from(new Set(results))); // Remove duplicates
  };
  
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Navnekombinator</h2>
          <p className="text-gray-600 mb-4">
            Kombiner to navn for å skape et unikt navn til barnet ditt, eller finn navn 
            som passer godt sammen som første- og mellomnavn.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
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
            />
            <datalist id="secondNameList">
              {allNameStrings.map((name, i) => (
                <option key={`second-${i}`} value={name} />
              ))}
            </datalist>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox" 
              className="mr-2 h-4 w-4" 
              checked={useDatabaseNames}
              onChange={() => setUseDatabaseNames(!useDatabaseNames)}
            />
            <span className="text-sm text-gray-600">
              Inkluder forslag basert på vår navnedatabase
            </span>
          </label>
        </div>
        
        <Button onClick={generateCombinations} className="w-full mb-6">
          Kombiner navn
        </Button>
        
        {combinations.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-3">Navneforslag</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {combinations.map((name, index) => (
                <div 
                  key={index} 
                  className="p-3 bg-gray-50 rounded-md text-center border border-gray-100 hover:bg-gray-100 transition-colors"
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NameCombinator;
