
import { supabase } from './client';

export const batchInsertNames = async (names: {
  name: string;
  gender: 'boy' | 'girl' | 'unisex';
  origin: string;
  meaning: string;
  popularity: number;
  length: 'short' | 'medium' | 'long';
  categories: string[];
  firstLetter: string;
}[]): Promise<{ success: boolean; inserted: number; errors: any[] }> => {
  const errors: any[] = [];
  let inserted = 0;
  
  try {
    for (let i = 0; i < names.length; i += 50) {
      const batch = names.slice(i, i + 50);
      
      const nameRecords = batch.map(name => ({
        name: name.name,
        gender: name.gender,
        origin: name.origin,
        meaning: name.meaning,
        popularity: name.popularity,
        length: name.length,
        first_letter: name.firstLetter
      }));
      
      const { data: insertedNames, error } = await supabase
        .from('baby_names')
        .insert(nameRecords)
        .select();
      
      if (error) {
        errors.push({ batch: i, error });
        console.error('Error inserting names batch:', error);
        continue;
      }
      
      for (let j = 0; j < insertedNames.length; j++) {
        const nameId = insertedNames[j].id;
        const nameCategories = batch[j].categories;
        
        const { data: categoryData, error: categoryError } = await supabase
          .from('name_categories')
          .select('id, name')
          .in('name', nameCategories);
        
        if (categoryError) {
          errors.push({ nameId, error: categoryError });
          console.error('Error fetching categories for name:', nameId, categoryError);
          continue;
        }
        
        const categoryMappings = categoryData.map(category => ({
          name_id: nameId,
          category_id: category.id
        }));
        
        if (categoryMappings.length > 0) {
          const { error: mappingError } = await supabase
            .from('name_category_mappings')
            .insert(categoryMappings);
          
          if (mappingError) {
            errors.push({ nameId, error: mappingError });
            console.error('Error inserting category mappings for name:', nameId, mappingError);
          }
        }
      }
      
      inserted += insertedNames.length;
      console.log(`Inserted batch ${i/50 + 1}/${Math.ceil(names.length/50)}, ${inserted}/${names.length} names so far`);
    }
    
    return { 
      success: errors.length === 0, 
      inserted,
      errors 
    };
  } catch (error) {
    console.error('Error in batch insert operation:', error);
    return { 
      success: false, 
      inserted,
      errors: [...errors, error] 
    };
  }
};

