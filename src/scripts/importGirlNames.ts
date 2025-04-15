
import { supabase } from '@/integrations/supabase/client';
import { fetchSSBData, processSSBData } from '@/utils/ssbDataFetcher';

interface NameWithCategories {
  name: string;
  gender: 'boy' | 'girl' | 'unisex';
  origin: string;
  meaning: string;
  popularity: number;
  length: 'short' | 'medium' | 'long';
  categories: string[];
  firstLetter: string;
}

const importGirlNames = async () => {
  try {
    console.log('Starting import of girl names from SSB...');
    const girlsData = await fetchSSBData('girl');
    const { enrichedNames } = processSSBData(girlsData, 'girl');
    
    // Prepare the data for bulk import with categories
    const namesWithCategories: NameWithCategories[] = enrichedNames.map(name => ({
      name: name.name,
      gender: name.gender,
      origin: name.origin,
      meaning: name.meaning,
      popularity: name.popularity,
      length: name.length,
      categories: name.categories,
      firstLetter: name.firstLetter
    }));

    // Use our new bulk upsert function - we need to call RPC with the correct parameter structure
    const { data, error } = await supabase.rpc(
      'bulk_upsert_names_with_categories',
      { p_names: namesWithCategories }
    );

    if (error) {
      throw error;
    }

    console.log('Successfully imported girl names to database');
    return { success: true };
  } catch (error) {
    console.error('Error importing girl names:', error);
    return { success: false, error };
  }
};

// Execute the import
importGirlNames().then(result => {
  if (result.success) {
    console.log('Import completed successfully');
  } else {
    console.error('Import failed:', result.error);
  }
});
