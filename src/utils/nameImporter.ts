
import { batchInsertNames } from "@/integrations/supabase/client";
import { BabyName } from "@/data/types";

/**
 * Utility to import a list of baby names to Supabase
 * 
 * Example usage in browser console:
 * 
 * import("/src/utils/nameImporter.ts").then(module => {
 *   const importNames = module.importNames;
 *   
 *   // Create your names array
 *   const names = [
 *     {
 *       name: "Emma",
 *       gender: "girl",
 *       origin: "Germanic",
 *       meaning: "Universal or whole",
 *       popularity: 95,
 *       length: "short",
 *       categories: ["classic", "international"],
 *       firstLetter: "E"
 *     },
 *     // More names...
 *   ];
 *   
 *   // Import the names
 *   importNames(names).then(result => console.log(result));
 * });
 */
export const importNames = async (names: {
  name: string;
  gender: 'boy' | 'girl' | 'unisex';
  origin: string;
  meaning: string;
  popularity: number;
  length: 'short' | 'medium' | 'long';
  categories: string[];
  firstLetter?: string;
}[]): Promise<{ success: boolean; inserted: number; errors: any[] }> => {
  // Prepare names, ensuring firstLetter is set
  const preparedNames = names.map(name => ({
    ...name,
    firstLetter: name.firstLetter || name.name.charAt(0).toUpperCase()
  }));
  
  // Validate names before import
  const validationErrors: any[] = [];
  preparedNames.forEach((name, index) => {
    if (!name.name) validationErrors.push(`Name at index ${index} has no name value`);
    if (!['boy', 'girl', 'unisex'].includes(name.gender)) 
      validationErrors.push(`Name "${name.name}" has invalid gender: ${name.gender}`);
    if (!['short', 'medium', 'long'].includes(name.length)) 
      validationErrors.push(`Name "${name.name}" has invalid length: ${name.length}`);
    if (name.popularity < 1 || name.popularity > 100) 
      validationErrors.push(`Name "${name.name}" has invalid popularity: ${name.popularity}. Must be between 1-100.`);
  });
  
  if (validationErrors.length > 0) {
    console.error("Validation errors:", validationErrors);
    return { success: false, inserted: 0, errors: validationErrors };
  }
  
  // Import to Supabase
  console.log(`Starting import of ${preparedNames.length} names...`);
  return batchInsertNames(preparedNames);
};

/**
 * Helper to generate names data in the correct format
 * 
 * Use this to create a basic template for a name entry
 */
export const createNameTemplate = (
  name: string,
  gender: 'boy' | 'girl' | 'unisex',
  origin: string = "",
  meaning: string = "",
  popularity: number = 50,
  length: 'short' | 'medium' | 'long' = 'medium',
  categories: string[] = []
) => {
  return {
    name,
    gender,
    origin,
    meaning,
    popularity,
    length,
    categories,
    firstLetter: name.charAt(0).toUpperCase()
  };
};

/**
 * Example usage for a data file:
 * 
 * Import specific Norwegian names from SSB or other sources
 * 
 * Example:
 * 
 * const norwegianNames = [
 *   createNameTemplate("Elias", "boy", "Hebrew", "Yahweh is God", 85, "medium", ["classic", "biblical"]),
 *   createNameTemplate("Nora", "girl", "Latin", "Honor", 92, "short", ["classic", "nordic"]),
 *   // More names...
 * ];
 * 
 * importNames(norwegianNames).then(result => console.log(result));
 */
