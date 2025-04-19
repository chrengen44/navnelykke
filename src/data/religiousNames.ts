
import { BabyName } from './types';
import { babyNames } from './namesData';

// Get all biblically related names
export const getBiblicalNames = (): BabyName[] => {
  return babyNames.filter(name => 
    name.categories.includes('bibelsk')
  );
};

// Get Christian names
export const getChristianNames = (): BabyName[] => {
  return babyNames.filter(name => 
    (name.origin.toLowerCase().includes('hebraisk') || 
     name.origin.toLowerCase().includes('gresk') ||
     name.categories.includes('bibelsk')) && 
    name.popularity > 40 // Somewhat popular names
  );
};

// Get Jewish names
export const getJewishNames = (): BabyName[] => {
  return babyNames.filter(name => 
    name.origin.toLowerCase().includes('hebraisk') || 
    name.meaning.toLowerCase().includes('gud')
  );
};

// Get Muslim names
export const getMuslimNames = (): BabyName[] => {
  // This is a placeholder - we'd need actual Muslim names in the database
  return babyNames.filter(name => 
    name.origin.toLowerCase().includes('arabisk')
  );
};

// Get Hindu names
export const getHinduNames = (): BabyName[] => {
  // This is a placeholder - we'd need actual Hindu names in the database
  return babyNames.filter(name => 
    name.origin.toLowerCase().includes('sanskrit') || 
    name.origin.toLowerCase().includes('indisk')
  );
};
