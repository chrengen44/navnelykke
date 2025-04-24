
import { supabase } from './client';

export const getOriginCounts = async (): Promise<{origin: string, name_count: number}[]> => {
  try {
    const { data, error } = await supabase
      .from('baby_names')
      .select('origin, id')
      .order('origin');
    
    if (error) throw error;
    if (!data) return [];
    
    const originCounts: Record<string, number> = {};
    data.forEach(name => {
      if (!originCounts[name.origin]) {
        originCounts[name.origin] = 0;
      }
      originCounts[name.origin]++;
    });
    
    return Object.entries(originCounts).map(([origin, count]) => ({
      origin,
      name_count: count
    }));
  } catch (error) {
    console.error('Error fetching origin counts:', error);
    return [];
  }
};

export const trackNameVisit = async (nameId: number) => {
  try {
    await supabase
      .from('name_visits')
      .insert({ name_id: nameId });
  } catch (error) {
    console.error('Error tracking name visit:', error);
  }
};

