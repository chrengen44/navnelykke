
import { BabyName } from './types';
import { babyNames } from './namesData';

export const getPopularNames = (gender?: 'boy' | 'girl' | 'unisex', limit = 10) => {
  let filtered = [...babyNames];
  
  if (gender) {
    filtered = filtered.filter(name => name.gender === gender);
  }
  
  return filtered
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
};

export const getNamesByCategory = (category: string, limit?: number) => {
  const filtered = babyNames.filter(name => 
    name.categories.includes(category)
  );
  
  return limit ? filtered.slice(0, limit) : filtered;
};

export const getNamesByLetter = (letter: string) => {
  return babyNames.filter(name => 
    name.firstLetter.toLowerCase() === letter.toLowerCase()
  );
};

export const getAllLetters = () => {
  const letters = new Set(babyNames.map(name => name.firstLetter));
  return Array.from(letters).sort();
};

export const getNamesByGender = (gender: 'boy' | 'girl' | 'unisex') => {
  return babyNames.filter(name => name.gender === gender);
};

export const getNamesByLength = (length: 'short' | 'medium' | 'long') => {
  return babyNames.filter(name => name.length === length);
};

export const searchNames = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  
  return babyNames.filter(name => 
    name.name.toLowerCase().includes(lowercaseQuery) ||
    name.meaning.toLowerCase().includes(lowercaseQuery) ||
    name.origin.toLowerCase().includes(lowercaseQuery)
  );
};
