
import { toast } from 'sonner';
import { fetchSSBNameData } from '@/utils/ssbApi';

export interface NameTrendData {
  year: string;
  [name: string]: string | number;
}

export const fetchNameTrendData = async (gender: 'girl' | 'boy', namesToFetch: string[]): Promise<NameTrendData[]> => {
  try {
    const data = await fetchSSBNameData(gender, namesToFetch);
    return data;
  } catch (error) {
    console.error(`Error fetching ${gender} name trend data:`, error);
    throw error;
  }
};

export const fetchPopularityTrendData = async (gender: 'girl' | 'boy', nameKeys: string[]): Promise<NameTrendData[]> => {
  try {
    const data = await fetchSSBNameData(gender, nameKeys);
    return data;
  } catch (error) {
    console.error(`Error fetching popularity trend data for ${gender}:`, error);
    throw error;
  }
};
