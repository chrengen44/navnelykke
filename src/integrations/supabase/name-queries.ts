
import { supabase } from './client';
import { BabyName } from '@/data/types';

export const fetchNameById = async (id: number): Promise<BabyName | null> => {
  try {
    const { data: name, error: nameError } = await supabase
      .from('baby_names')
      .select('*')
      .eq('id', id)
      .single();

    if (nameError) {
      console.error('Error fetching name:', nameError);
      return null;
    }

    if (!name) {
      console.log('No name found with ID:', id);
      return null;
    }

    // Fetch categories for this name
    const { data: mappings, error: mappingsError } = await supabase
      .from('name_category_mappings')
      .select('name_categories(name)')
      .eq('name_id', id);

    if (mappingsError) {
      console.error('Error fetching categories:', mappingsError);
      return {
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
      };
    }

    const categories = mappings.map(mapping => mapping.name_categories.name);

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
  } catch (error) {
    console.error('Error fetching name by ID:', error);
    return null;
  }
};

export const fetchAllNames = async (): Promise<BabyName[]> => {
  try {
    const { data: namesData, error: namesError } = await supabase
      .from('baby_names')
      .select('*');

    if (namesError) throw namesError;

    const { data: mappingsData, error: mappingsError } = await supabase
      .from('name_category_mappings')
      .select('name_id, category_id, name_categories(name)')
      .returns<{ name_id: number; category_id: number; name_categories: { name: string } }[]>();

    if (mappingsError) throw mappingsError;

    return namesData.map(name => {
      const categories = mappingsData
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
    console.error('Error fetching names:', error);
    throw error;
  }
};

