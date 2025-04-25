
export const VALID_TABLES = [
  'baby_names', 
  'favorites', 
  'profiles', 
  'name_categories', 
  'name_category_mappings', 
  'name_list_items', 
  'name_lists', 
  'name_polls', 
  'name_visits', 
  'poll_analytics', 
  'poll_items', 
  'poll_votes', 
  'suggested_names', 
  'user_privacy_settings', 
  'user_sessions'
] as const;

export type ValidTableName = typeof VALID_TABLES[number];

export const validateTableName = (tableName: string): tableName is ValidTableName => {
  return (VALID_TABLES as readonly string[]).includes(tableName);
};
