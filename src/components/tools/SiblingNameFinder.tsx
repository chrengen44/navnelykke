
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { babyNames } from "@/data";
import { BabyName } from "@/data/types";
import { useToast } from "@/hooks/use-toast";

const SiblingNameFinder: React.FC = () => {
  const { toast } = useToast();
  const [siblingName, setSiblingName] = useState("");
  const [gender, setGender] = useState<"boy" | "girl" | "unisex">("girl");
  const [results, setResults] = useState<BabyName[]>([]);
  const [loading, setLoading] = useState(false);
  
  const findSiblingNames = () => {
    if (!siblingName.trim()) {
      toast({
        title: "Manglende informasjon",
        description: "Vennligst skriv inn navnet på eksisterende barn",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Find the sibling name in our database to get details
    const existingSibling = babyNames.find(
      name => name.name.toLowerCase() === siblingName.toLowerCase()
    );
    
    // Filter potential matches based on different criteria
    let matches: BabyName[] = [];
    
    // 1. Filter by gender
    let genderFiltered = babyNames.filter(name => name.gender === gender);
    
    if (existingSibling) {
      // 2. Find names with similar origin
      const originMatches = genderFiltered.filter(
        name => name.origin === existingSibling.origin
      );
      matches = [...matches, ...originMatches.slice(0, 5)];
      
      // 3. Find names with same first letter
      const firstLetterMatches = genderFiltered.filter(
        name => name.firstLetter === existingSibling.firstLetter && !matches.includes(name)
      );
      matches = [...matches, ...firstLetterMatches.slice(0, 3)];
      
      // 4. Find names with similar length
      const lengthMatches = genderFiltered.filter(
        name => name.length === existingSibling.length && !matches.includes(name)
      );
      matches = [...matches, ...lengthMatches.slice(0, 3)];
      
      // 5. Find names with similar categories
      const categoryMatches = genderFiltered.filter(
        name => name.categories.some(cat => existingSibling.categories.includes(cat)) && 
        !matches.includes(name)
      );
      matches = [...matches, ...categoryMatches.slice(0, 5)];
    } else {
      // If sibling name not found, use first letter matching
      const firstLetter = siblingName[0].toUpperCase();
      const letterMatches = genderFiltered.filter(name => name.firstLetter === firstLetter);
      matches = [...matches, ...letterMatches.slice(0, 5)];
      
      // Add some popular names
      const popularNames = genderFiltered
        .sort((a, b) => b.popularity - a.popularity)
        .filter(name => !matches.includes(name))
        .slice(0, 7);
      matches = [...matches, ...popularNames];
    }
    
    // Remove duplicates and limit results
    const uniqueMatches = Array.from(new Set(matches)).slice(0, 12);
    
    // Sort by popularity
    uniqueMatches.sort((a, b) => b.popularity - a.popularity);
    
    setResults(uniqueMatches);
    setLoading(false);
  };
  
  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Søskennavn</h2>
          <p className="text-gray-600 mb-4">
            Finn navn som passer godt sammen med dine nåværende barns navn.
          </p>
        </div>
        
        <div className="mb-6">
          <label htmlFor="siblingName" className="block text-sm font-medium text-gray-700 mb-1">
            Navn på eksisterende barn
          </label>
          <Input
            id="siblingName"
            placeholder="F.eks. Emma"
            value={siblingName}
            onChange={(e) => setSiblingName(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Kjønn på nytt barn</h3>
          <RadioGroup value={gender} onValueChange={(val: "boy" | "girl" | "unisex") => setGender(val)} className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="girl" id="newGirl" />
              <Label htmlFor="newGirl">Jente</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="boy" id="newBoy" />
              <Label htmlFor="newBoy">Gutt</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="unisex" id="newUnisex" />
              <Label htmlFor="newUnisex">Unisex</Label>
            </div>
          </RadioGroup>
        </div>
        
        <Button 
          onClick={findSiblingNames} 
          className="w-full mb-6"
          disabled={loading}
        >
          {loading ? "Søker..." : "Finn søskennavn"}
        </Button>
        
        {results.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-3">
              Navn som passer med {siblingName}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {results.map((name) => (
                <div 
                  key={name.id} 
                  className="p-3 bg-gray-50 rounded-md text-center border border-gray-100 hover:bg-gray-100 transition-colors"
                >
                  <div className="font-medium">{name.name}</div>
                  <div className="text-xs text-gray-500 truncate" title={name.meaning}>
                    {name.meaning}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SiblingNameFinder;
