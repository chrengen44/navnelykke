
export interface BabyName {
  id: number;
  name: string;
  gender: 'boy' | 'girl' | 'unisex';
  origin: string;
  meaning: string;
  popularity: number; // 1-100 scale
  length: 'short' | 'medium' | 'long';
  categories: string[];
  firstLetter: string;
  phonetic?: string; // New optional field
  popularityData?: { year: number; count: number }[];
}
