
import { importNames } from './nameImporter';
import { babyNames } from '@/data/namesData';
import { BabyName } from '@/data/types';

/**
 * Convert hardcoded names from the namesData.ts file to the format expected by the importer
 */
const convertNameFormat = (name: BabyName) => {
  return {
    name: name.name,
    gender: name.gender,
    origin: name.origin,
    meaning: name.meaning,
    popularity: name.popularity,
    length: name.length,
    categories: name.categories,
    firstLetter: name.firstLetter
  };
};

/**
 * Import all hardcoded names from namesData.ts to Supabase
 * 
 * Example usage in browser console:
 * 
 * import("/src/utils/importHardcodedNames.ts").then(module => {
 *   module.importHardcodedNames().then(result => console.log(result));
 * });
 */
export const importHardcodedNames = async () => {
  console.log(`Preparing to import ${babyNames.length} hardcoded names to Supabase...`);
  
  // Convert names to the format expected by the importer
  const formattedNames = babyNames.map(convertNameFormat);
  
  // Import names to Supabase
  const result = await importNames(formattedNames);
  
  return {
    ...result,
    totalNames: babyNames.length
  };
};

/**
 * Import names by gender
 * 
 * Example usage in browser console:
 * 
 * import("/src/utils/importHardcodedNames.ts").then(module => {
 *   module.importNamesByGender("girl").then(result => console.log(result));
 * });
 */
export const importNamesByGender = async (gender: 'boy' | 'girl' | 'unisex') => {
  const filteredNames = babyNames.filter(name => name.gender === gender);
  console.log(`Preparing to import ${filteredNames.length} ${gender} names to Supabase...`);
  
  const formattedNames = filteredNames.map(convertNameFormat);
  const result = await importNames(formattedNames);
  
  return {
    ...result,
    totalNames: filteredNames.length,
    gender
  };
};

/**
 * Import names by category
 * 
 * Example usage in browser console:
 * 
 * import("/src/utils/importHardcodedNames.ts").then(module => {
 *   module.importNamesByCategory("klassisk").then(result => console.log(result));
 * });
 */
export const importNamesByCategory = async (category: string) => {
  const filteredNames = babyNames.filter(name => name.categories.includes(category));
  console.log(`Preparing to import ${filteredNames.length} names in category "${category}" to Supabase...`);
  
  const formattedNames = filteredNames.map(convertNameFormat);
  const result = await importNames(formattedNames);
  
  return {
    ...result,
    totalNames: filteredNames.length,
    category
  };
};
