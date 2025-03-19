
import { createNameTemplate } from "./nameImporter";

/**
 * Example Norwegian Popular Girl Names
 * Data based on SSB statistics and other sources
 */
export const norwegianPopularGirlNames = [
  createNameTemplate("Emma", "girl", "Germanic", "Universal or whole", 95, "short", ["classic", "international"]),
  createNameTemplate("Nora", "girl", "Latin", "Honor", 92, "short", ["classic", "nordic"]),
  createNameTemplate("Olivia", "girl", "Latin", "Olive tree", 90, "medium", ["trendy", "international"]),
  createNameTemplate("Ella", "girl", "Germanic", "All, completely", 88, "short", ["classic", "nordic"]),
  createNameTemplate("Maja", "girl", "Norse", "May, spring", 87, "short", ["nordic", "nature"]),
  createNameTemplate("Sofia", "girl", "Greek", "Wisdom", 85, "medium", ["classic", "international"]),
  createNameTemplate("Ingrid", "girl", "Norse", "Beautiful", 82, "medium", ["nordic", "viking"]),
  createNameTemplate("Leah", "girl", "Hebrew", "Weary", 80, "short", ["biblical", "international"]),
  createNameTemplate("Frida", "girl", "Germanic", "Peace", 79, "short", ["nordic"]),
  createNameTemplate("Sara", "girl", "Hebrew", "Princess", 78, "short", ["biblical", "international"])
];

/**
 * Example Norwegian Popular Boy Names
 * Data based on SSB statistics and other sources
 */
export const norwegianPopularBoyNames = [
  createNameTemplate("Emil", "boy", "Latin", "Rival, emulate", 94, "short", ["classic", "nordic"]),
  createNameTemplate("Noah", "boy", "Hebrew", "Rest, comfort", 93, "short", ["biblical", "international"]),
  createNameTemplate("Oliver", "boy", "Latin", "Olive tree", 92, "medium", ["trendy", "international"]),
  createNameTemplate("William", "boy", "Germanic", "Resolute protector", 91, "medium", ["classic", "international"]),
  createNameTemplate("Isak", "boy", "Hebrew", "Laughter", 88, "short", ["biblical", "nordic"]),
  createNameTemplate("Oskar", "boy", "Old English", "God's spear", 87, "medium", ["nordic", "classic"]),
  createNameTemplate("Aksel", "boy", "Hebrew", "Father of peace", 86, "medium", ["nordic"]),
  createNameTemplate("Theodor", "boy", "Greek", "Gift of God", 85, "medium", ["classic", "international"]),
  createNameTemplate("Jakob", "boy", "Hebrew", "Supplanter", 84, "medium", ["biblical", "nordic"]),
  createNameTemplate("Liam", "boy", "Irish", "Strong-willed warrior", 83, "short", ["trendy", "international"])
];

/**
 * Example Viking/Nordic Names
 * Historical Norse names
 */
export const vikingNames = [
  createNameTemplate("Freya", "girl", "Norse", "Lady, goddess of love", 75, "medium", ["viking", "nordic", "nature"]),
  createNameTemplate("Astrid", "girl", "Norse", "Divine strength", 70, "medium", ["viking", "nordic"]),
  createNameTemplate("Signe", "girl", "Norse", "New victory", 60, "medium", ["viking", "nordic"]),
  createNameTemplate("Liv", "girl", "Norse", "Life, protection", 65, "short", ["viking", "nordic", "nature"]),
  createNameTemplate("Saga", "girl", "Norse", "Storyteller", 60, "short", ["viking", "nordic"]),
  
  createNameTemplate("Thor", "boy", "Norse", "Thunder", 68, "short", ["viking", "nordic"]),
  createNameTemplate("Bjørn", "boy", "Norse", "Bear", 65, "short", ["viking", "nordic", "nature"]),
  createNameTemplate("Odin", "boy", "Norse", "Fury, excitement", 62, "short", ["viking", "nordic"]),
  createNameTemplate("Leif", "boy", "Norse", "Heir, descendant", 58, "short", ["viking", "nordic"]),
  createNameTemplate("Harald", "boy", "Norse", "Army ruler", 55, "medium", ["viking", "nordic"])
];

/**
 * Example of International Names
 * Popular names from various cultures
 */
export const internationalNames = [
  // Asian Names
  createNameTemplate("Mei", "girl", "Chinese", "Beautiful", 60, "short", ["international", "unique"]),
  createNameTemplate("Yuki", "girl", "Japanese", "Snow", 55, "short", ["international", "nature"]),
  createNameTemplate("Amir", "boy", "Arabic/Hebrew", "Prince, commander", 65, "short", ["international"]),
  createNameTemplate("Kai", "boy", "Hawaiian", "Sea", 70, "short", ["international", "nature"]),
  
  // European Names
  createNameTemplate("Chiara", "girl", "Italian", "Bright, clear", 62, "medium", ["international"]),
  createNameTemplate("Sören", "boy", "Swedish", "Stern", 58, "medium", ["international", "nordic"]),
  createNameTemplate("Amélie", "girl", "French", "Industrious", 65, "medium", ["international"]),
  createNameTemplate("Mateo", "boy", "Spanish", "Gift of God", 75, "medium", ["international", "biblical"]),
  
  // African Names
  createNameTemplate("Amara", "girl", "Igbo", "Grace", 60, "medium", ["international", "unique"]),
  createNameTemplate("Kofi", "boy", "Ghanaian", "Born on Friday", 55, "short", ["international", "unique"])
];

/**
 * Example Nature-Inspired Names
 */
export const natureNames = [
  createNameTemplate("Lily", "girl", "Latin", "Flower symbolizing purity", 75, "short", ["nature", "international"]),
  createNameTemplate("Aurora", "girl", "Latin", "Dawn", 68, "medium", ["nature", "unique"]),
  createNameTemplate("Willow", "girl", "English", "Willow tree", 65, "medium", ["nature", "unique"]),
  createNameTemplate("River", "unisex", "English", "Flowing body of water", 60, "medium", ["nature", "unique"]),
  createNameTemplate("Storm", "unisex", "English", "Tempest", 55, "short", ["nature", "unique"]),
  createNameTemplate("Forrest", "boy", "English", "Woods", 58, "medium", ["nature"]),
  createNameTemplate("Cliff", "boy", "English", "Steep rock face", 50, "short", ["nature"])
];

/**
 * Example of How to Use These Templates:
 * 
 * Import your desired name sets and batch them to Supabase
 *
 * Example:
 * 
 * import { importNames } from "./nameImporter";
 * import { 
 *   norwegianPopularBoyNames, 
 *   norwegianPopularGirlNames,
 *   vikingNames,
 *   internationalNames,
 *   natureNames
 * } from "./nameDataTemplates";
 * 
 * // Combine all name sets
 * const allNames = [
 *   ...norwegianPopularBoyNames,
 *   ...norwegianPopularGirlNames,
 *   ...vikingNames,
 *   ...internationalNames,
 *   ...natureNames
 * ];
 * 
 * // Import to database
 * importNames(allNames).then(result => console.log(result));
 */
