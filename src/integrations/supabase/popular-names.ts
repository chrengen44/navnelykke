
import { supabase } from './client';
import { BabyName } from '@/data/types';
import { toast } from 'sonner';

export const fetchPopularNames = async (
  gender?: 'boy' | 'girl' | 'unisex',
  limit = 10
): Promise<BabyName[]> => {
  try {
    let query = supabase
      .from('baby_names')
      .select('*')
      .order('popularity', { ascending: false });

    if (gender) {
      query = query.eq('gender', gender);
    }

    if (limit) {
      query = query.limit(limit);
    }

    const { data: names, error: namesError } = await query;

    if (namesError) {
      console.error('Error fetching baby names:', namesError);
      toast.error('Could not fetch popular names');
      return [];
    }

    if (!names || names.length === 0) {
      return [];
    }

    const nameIds = names.map(name => name.id);

    // If we have no IDs, return early
    if (nameIds.length === 0) {
      return [];
    }

    try {
      const { data: mappings, error: mappingsError } = await supabase
        .from('name_category_mappings')
        .select('name_id, name_categories(name)')
        .in('name_id', nameIds);

      if (mappingsError) throw mappingsError;

      return names.map(name => {
        const categories = mappings
          ?.filter(mapping => mapping.name_id === name.id)
          .map(mapping => mapping.name_categories.name) || [];

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
      // If category mapping fails, just return names without categories
      console.error('Error fetching name categories:', error);
      return names.map(name => ({
        id: name.id,
        name: name.name,
        gender: name.gender as 'boy' | 'girl' | 'unisex',
        origin: name.origin,
        meaning: name.meaning,
        popularity: name.popularity,
        length: name.length as 'short' | 'medium' | 'long',
        categories: [],
        firstLetter: name.first_letter,
        phonetic: name.phonetic || undefined,
      }));
    }
  } catch (error) {
    console.error('Error fetching popular names:', error);
    toast.error('Error loading names');
    return [];
  }
};
