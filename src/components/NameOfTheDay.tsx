
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BabyName } from "@/data/types";
import { supabase } from "@/integrations/supabase/client";

const NameOfTheDay: React.FC = () => {
  const [todaysName, setTodaysName] = useState<BabyName | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNameOfTheDay = async () => {
      try {
        setLoading(true);
        // Get a deterministic "random" name based on the current date
        const now = new Date();
        const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000);

        // Fetch total count of names to use for deterministic selection
        const { count, error: countError } = await supabase
          .from('baby_names')
          .select('id', { count: 'exact' });

        if (countError || !count) {
          console.error('Error fetching name count:', countError);
          return;
        }

        // Use day of year to deterministically select a name ID
        const nameIndex = dayOfYear % count;

        // Fetch the name with categories
        const { data, error } = await supabase
          .from('baby_names')
          .select(`
            id, 
            name, 
            gender, 
            origin, 
            meaning, 
            popularity, 
            length, 
            first_letter,
            name_category_mappings (
              name_categories (name)
            )
          `)
          .order('id')
          .range(nameIndex, nameIndex)
          .single();

        if (error) {
          console.error('Error fetching name of the day:', error);
          return;
        }

        // Transform the data to match BabyName interface
        const transformedName: BabyName = {
          id: data.id,
          name: data.name,
          gender: data.gender as 'boy' | 'girl' | 'unisex',
          origin: data.origin,
          meaning: data.meaning,
          popularity: data.popularity,
          length: data.length as 'short' | 'medium' | 'long',
          firstLetter: data.first_letter,
          categories: data.name_category_mappings.map(
            (mapping: any) => mapping.name_categories.name
          )
        };

        setTodaysName(transformedName);
      } catch (error) {
        console.error('Unexpected error fetching name of the day:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNameOfTheDay();
  }, []);

  if (loading) {
    return (
      <Card className="bg-white shadow-sm border-0">
        <CardContent className="p-6 flex items-center justify-center h-40">
          <div className="animate-pulse rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
        </CardContent>
      </Card>
    );
  }

  if (!todaysName) {
    return (
      <Card className="bg-white shadow-sm border-0">
        <CardContent className="p-6 text-center text-gray-600">
          Ingen navn funnet for dagen
        </CardContent>
      </Card>
    );
  }

  // Determine the background color based on gender
  const bgColorClass = todaysName.gender === 'girl' 
    ? 'bg-babypink/30' 
    : todaysName.gender === 'boy' 
      ? 'bg-babyblue/30'
      : 'bg-babypeach/30';

  return (
    <Card className={`shadow-sm border-0 ${bgColorClass}`}>
      <CardHeader className="pb-2 pt-4">
        <h3 className="text-lg font-semibold text-center">Dagens navn</h3>
      </CardHeader>
      
      <CardContent className="py-3 px-6 text-center">
        <div className="mb-2">
          <Link to={`/navn/${todaysName.id}`} className="text-2xl font-bold hover:text-pink-600 transition-colors">
            {todaysName.name}
          </Link>
        </div>
        
        <div className="text-sm text-gray-600 mb-2">
          Opprinnelse: {todaysName.origin}
        </div>
        
        <p className="text-sm">
          {todaysName.meaning}
        </p>
      </CardContent>
      
      <CardFooter className="pt-2 pb-4 flex justify-center">
        <Button asChild size="sm" variant="outline">
          <Link to={`/navn/${todaysName.id}`}>
            Les mer
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NameOfTheDay;
