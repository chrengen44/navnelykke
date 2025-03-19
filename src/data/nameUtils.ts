
import { BabyName } from './types';
import { babyNames } from './namesData';
import { 
  fetchPopularNames as fetchPopularNamesFromDB,
  fetchNamesByCategory as fetchNamesByCategoryFromDB,
  searchNames as searchNamesFromDB,
  fetchAllNames
} from '@/integrations/supabase/client';

// Fallback to in-memory data if needed
let inMemoryNames: BabyName[] = [...babyNames];

// Initialize with in-memory data, but try to fetch from DB
(async () => {
  try {
    const names = await fetchAllNames();
    if (names && names.length > 0) {
      inMemoryNames = names;
      console.log('Successfully loaded names from database');
    }
  } catch (error) {
    console.error('Error loading names from database, using in-memory data:', error);
  }
})();

export const getPopularNames = async (gender?: 'boy' | 'girl' | 'unisex', limit = 10) => {
  try {
    return await fetchPopularNamesFromDB(gender, limit);
  } catch (error) {
    console.error('Error fetching popular names from DB, using in-memory data:', error);
    // Fallback to in-memory data
    let filtered = [...inMemoryNames];
    
    if (gender) {
      filtered = filtered.filter(name => name.gender === gender);
    }
    
    return filtered
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, limit);
  }
};

export const getNamesByCategory = async (category: string, limit?: number) => {
  try {
    return await fetchNamesByCategoryFromDB(category);
  } catch (error) {
    console.error('Error fetching names by category from DB, using in-memory data:', error);
    // Fallback to in-memory data
    const filtered = inMemoryNames.filter(name => 
      name.categories.includes(category)
    );
    
    return limit ? filtered.slice(0, limit) : filtered;
  }
};

export const getNamesByLetter = (letter: string) => {
  return inMemoryNames.filter(name => 
    name.firstLetter.toLowerCase() === letter.toLowerCase()
  );
};

export const getAllLetters = () => {
  const letters = new Set(inMemoryNames.map(name => name.firstLetter));
  return Array.from(letters).sort();
};

export const getNamesByGender = (gender: 'boy' | 'girl' | 'unisex') => {
  return inMemoryNames.filter(name => name.gender === gender);
};

export const getNamesByLength = (length: 'short' | 'medium' | 'long') => {
  return inMemoryNames.filter(name => name.length === length);
};

export const searchNames = async (query: string) => {
  try {
    return await searchNamesFromDB(query);
  } catch (error) {
    console.error('Error searching names from DB, using in-memory data:', error);
    // Fallback to in-memory data
    const lowercaseQuery = query.toLowerCase();
    
    return inMemoryNames.filter(name => 
      name.name.toLowerCase().includes(lowercaseQuery) ||
      name.meaning.toLowerCase().includes(lowercaseQuery) ||
      name.origin.toLowerCase().includes(lowercaseQuery)
    );
  }
};
