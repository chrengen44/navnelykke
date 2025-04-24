
import { supabase } from './client';

export const trackPollAnalytics = async (
  pollId: string, 
  eventType: 'view' | 'share' | 'vote', 
  metadata: Record<string, any> = {}
) => {
  try {
    const { error } = await supabase
      .from('poll_analytics')
      .insert({
        poll_id: pollId,
        event_type: eventType,
        metadata: metadata
      });

    if (error) throw error;
  } catch (error) {
    console.error(`Error tracking poll analytics for ${eventType}:`, error);
  }
};

export const getPollAnalytics = async (pollId: string) => {
  try {
    const { data, error } = await supabase
      .from('poll_analytics')
      .select('*')
      .eq('poll_id', pollId);

    if (error) throw error;

    // Group analytics by event type
    const analytics = {
      views: data.filter(event => event.event_type === 'view').length,
      shares: data.filter(event => event.event_type === 'share').length,
      votes: data.filter(event => event.event_type === 'vote').length
    };

    return analytics;
  } catch (error) {
    console.error('Error fetching poll analytics:', error);
    return null;
  }
};
