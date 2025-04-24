
import { supabase } from './client';
import { BabyName } from '@/data/types';

export const searchNames = async (query: string): Promise<BabyName[]> => {
  try {
    const searchTerm = `%${query.toLowerCase()}%`;

    const { data: names, error: namesError } = await supabase
      .from('baby_names')
      .select('*')
      .or(`name.ilike.${searchTerm},meaning.ilike.${searchTerm},origin.ilike.${searchTerm}`);

    if (namesError) throw namesError;

    if (names.length === 0) return [];

    const nameIds = names.map(name => name.id);

    const { data: mappings, error: mappingsError } = await supabase
      .from('name_category_mappings')
      .select('name_id, name_categories(name)')
      .in('name_id', nameIds);

    if (mappingsError) throw mappingsError;

    return names.map(name => {
      const categories = mappings
        .filter(mapping => mapping.name_id === name.id)
        .map(mapping => mapping.name_categories.name);

      return {
        id: name.id,
        name: name.name,
        gender: name.gender as 'boy' | 'girl' | 'unisex',
        origin: name.origin,
        meaning: name.meaning,
        popularity: name.popularity,
        length: name.length as 'short' | 'medium' | 'long',
        categories: categories,
        firstLetter: name.first_letter,
        phonetic: name.phonetic || undefined,
      };
    });
  } catch (error) {
    console.error('Error searching names:', error);
    return [];
  }
};

