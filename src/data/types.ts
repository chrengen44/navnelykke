export interface NameCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
}

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
  phonetic?: string; // Optional phonetic spelling
  popularityData?: { year: number; count: number }[];
}

export interface NamePoll {
  id: string;
  creator_id: string | null;
  title: string;
  description: string | null;
  is_anonymous: boolean;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface PollItem {
  id: string;
  poll_id: string;
  name_id: number | null;
  custom_name: string | null;
  created_at: string;
}

export interface PollVote {
  id: string;
  poll_id: string;
  poll_item_id: string;
  voter_id: string | null;
  voter_name: string | null;
  voter_email: string | null;
  created_at: string;
}
