
import { supabase } from './client';
import { NameCategory, BabyName } from '@/data/types';

export const fetchCategories = async (): Promise<NameCategory[]> => {
  try {
    const { data, error } = await supabase
      .from('name_categories')
      .select('*');

    if (error) throw error;

    return data.map(category => ({
      id: category.name,
      title: category.title,
      description: category.description || '',
      icon: category.icon || 'crown'
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const fetchNamesByCategory = async (category: string): Promise<BabyName[]> => {
  try {
    const { data: categoryData, error: categoryError } = await supabase
      .from('name_categories')
      .select('id')
      .eq('name', category)
      .single();

    if (categoryError) throw categoryError;

    const { data: mappings, error: mappingsError } = await supabase
      .from('name_category_mappings')
      .select('name_id')
      .eq('category_id', categoryData.id);

    if (mappingsError) throw mappingsError;

    if (mappings.length === 0) return [];

    const nameIds = mappings.map(mapping => mapping.name_id);

    const { data: names, error: namesError } = await supabase
      .from('baby_names')
      .select('*')
      .in('id', nameIds);

    if (namesError) throw namesError;

    const { data: allMappings, error: allMappingsError } = await supabase
      .from('name_category_mappings')
      .select('name_id, name_categories(name)')
      .in('name_id', nameIds);

    if (allMappingsError) throw allMappingsError;

    return names.map(name => {
      const categories = allMappings
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
    console.error('Error fetching names by category:', error);
    return [];
  }
};

