
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
}

export interface NameCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
}
