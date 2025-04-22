
import { supabase } from "@/integrations/supabase/client";
import { BabyName } from "@/data/types";

export const fetchNameOfTheDay = async (): Promise<BabyName | null> => {
  try {
    // Get a deterministic "random" name based on the current date
    const now = new Date();
    const dayOfYear = Math.floor(
      (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000
    );

    // Fetch total count of names to use for deterministic selection
    const { count, error: countError } = await supabase
      .from('baby_names')
      .select('id', { count: 'exact' });

    if (countError || !count) {
      console.error('Error fetching name count:', countError);
      return null;
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
      return null;
    }

    // Transform the data to match BabyName interface
    return {
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
  } catch (error) {
    console.error('Unexpected error fetching name of the day:', error);
    return null;
  }
};
