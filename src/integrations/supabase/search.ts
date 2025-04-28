
import { supabase } from './client';
import { BabyName } from '@/data/types';

export interface SearchOptions {
  limit?: number;
  fuzzy?: boolean;
  threshold?: number;
}

export const searchNames = async (query: string, options: SearchOptions = {}): Promise<BabyName[]> => {
  try {
    const { limit = 100, fuzzy = true } = options;
    
    // For fuzzy search, we use trigram similarity with the % operator
    if (fuzzy) {
      const { data: names, error: namesError } = await supabase
        .from('baby_names')
        .select('*')
        .or(
          `name.ilike.%${query}%,` +
          `meaning.ilike.%${query}%,` +
          `origin.ilike.%${query}%`
        )
        .order('popularity', { ascending: false })
        .limit(limit);

      if (namesError) throw namesError;

      if (!names || names.length === 0) return [];

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
    } else {
      // Exact search (legacy implementation)
      const searchTerm = `%${query.toLowerCase()}%`;

      const { data: names, error: namesError } = await supabase
        .from('baby_names')
        .select('*')
        .or(`name.ilike.${searchTerm},meaning.ilike.${searchTerm},origin.ilike.${searchTerm}`)
        .limit(limit);

      if (namesError) throw namesError;

      if (!names || names.length === 0) return [];

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
    }
  } catch (error) {
    console.error('Error searching names:', error);
    return [];
  }
};

// Function to get autocomplete suggestions as user types
export const getAutocompleteSuggestions = async (query: string, limit = 5): Promise<string[]> => {
  try {
    if (!query || query.length < 2) return [];
    
    const searchTerm = `${query.toLowerCase()}%`;

    // Get name suggestions
    const { data: names, error: namesError } = await supabase
      .from('baby_names')
      .select('name')
      .ilike('name', searchTerm)
      .order('popularity', { ascending: false })
      .limit(limit);

    if (namesError) throw namesError;

    // Get meaning suggestions 
    const { data: meanings, error: meaningsError } = await supabase
      .from('baby_names')
      .select('meaning')
      .ilike('meaning', searchTerm)
      .order('popularity', { ascending: false })
      .limit(limit);

    if (meaningsError) throw meaningsError;

    // Get origin suggestions
    const { data: origins, error: originsError } = await supabase
      .from('baby_names')
      .select('origin')
      .ilike('origin', searchTerm)
      .order('popularity', { ascending: false })
      .limit(limit);

    if (originsError) throw originsError;

    // Combine results and remove duplicates
    const suggestions = [
      ...names.map(item => item.name),
      ...meanings.map(item => item.meaning),
      ...origins.map(item => item.origin)
    ];

    return [...new Set(suggestions)].slice(0, limit);
  } catch (error) {
    console.error('Error getting autocomplete suggestions:', error);
    return [];
  }
};
