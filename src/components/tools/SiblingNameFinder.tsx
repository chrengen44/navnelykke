
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { babyNames } from "@/data";
import { BabyName } from "@/data/types";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";

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
    setTimeout(() => {
      // Find the sibling name in our database to get details
      const existingSibling = babyNames.find(
        name => name.name.toLowerCase() === siblingName.toLowerCase()
      );
      let matches: BabyName[] = [];
      let genderFiltered = babyNames.filter(name => name.gender === gender);
      if (existingSibling) {
        const originMatches = genderFiltered.filter(
          name => name.origin === existingSibling.origin
        );
        matches = [...matches, ...originMatches.slice(0, 5)];
        const firstLetterMatches = genderFiltered.filter(
          name => name.firstLetter === existingSibling.firstLetter && !matches.includes(name)
        );
        matches = [...matches, ...firstLetterMatches.slice(0, 3)];
        const lengthMatches = genderFiltered.filter(
          name => name.length === existingSibling.length && !matches.includes(name)
        );
        matches = [...matches, ...lengthMatches.slice(0, 3)];
        const categoryMatches = genderFiltered.filter(
          name => name.categories.some(cat => existingSibling.categories.includes(cat)) && 
          !matches.includes(name)
        );
        matches = [...matches, ...categoryMatches.slice(0, 5)];
      } else {
        const firstLetter = siblingName[0].toUpperCase();
        const letterMatches = genderFiltered.filter(name => name.firstLetter === firstLetter);
        matches = [...matches, ...letterMatches.slice(0, 5)];
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
    }, 900);
  };
  
  return (
    <Card className="bg-white shadow-md border-0">
      <CardContent className="p-6 md:p-8 flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-1">Søskennavn</h2>
          <p className="text-gray-600 mb-2 text-sm">
            Finn navn som passer godt sammen med dine nåværende barns navn.
          </p>
        </div>
        <div>
          <label htmlFor="siblingName" className="block text-sm font-medium text-gray-700 mb-1">
            Navn på eksisterende barn
          </label>
          <Input
            id="siblingName"
            placeholder="F.eks. Emma"
            value={siblingName}
            onChange={(e) => setSiblingName(e.target.value)}
            className="w-full"
            autoComplete="off"
          />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Kjønn på nytt barn</h3>
          <RadioGroup value={gender} onValueChange={(val: "boy" | "girl" | "unisex") => setGender(val)} className="flex flex-wrap gap-4">
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
          className="w-full max-w-xs self-center"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2"><Loader className="animate-spin h-5 w-5" /> Søker...</span>
          ) : "Finn søskennavn"}
        </Button>
        <div>
          {loading ? (
            <div className="w-full py-10 flex flex-col items-center justify-center animate-fade-in">
              <Loader className="w-10 h-10 text-green-400 animate-spin mb-2" />
              <span className="text-gray-400 text-sm">Laster forslag...</span>
            </div>
          ) : (
            results.length > 0 && (
              <div className="animate-fade-in">
                <h3 className="text-lg font-semibold mb-3 text-center">
                  Navn som passer med {siblingName}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {results.map((name) => (
                    <div 
                      key={name.id} 
                      className="p-3 bg-gray-50 rounded-lg text-center border border-gray-100 hover:bg-green-50 transition-colors shadow-sm flex flex-col min-h-[70px]"
                    >
                      <div className="font-medium text-green-700 text-base">{name.name}</div>
                      <div className="text-xs mt-1 text-gray-500 min-h-[28px] truncate" title={name.meaning}>
                        {name.meaning}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SiblingNameFinder;
