
import { supabase } from '@/integrations/supabase/client';
import { FetchOptions } from './types';
import { validateTable } from '../helpers';
import { ValidTableName } from '../tableValidator';

export const fetchData = async <T>(
  table: ValidTableName,
  options: FetchOptions = {}
): Promise<T[]> => {
  try {
    validateTable(table);

    let query = supabase.from(table).select(options.columns || '*');

    if (options.filters) {
      options.filters.forEach(filter => {
        const { column, operator, value } = filter;
        
        switch (operator) {
          case 'eq':
            query = query.eq(column, value);
            break;
          case 'neq':
            query = query.neq(column, value);
            break;
          case 'gt':
            query = query.gt(column, value);
            break;
          case 'lt':
            query = query.lt(column, value);
            break;
          case 'gte':
            query = query.gte(column, value);
            break;
          case 'lte':
            query = query.lte(column, value);
            break;
          case 'like':
            query = query.like(column, `%${value}%`);
            break;
          case 'ilike':
            query = query.ilike(column, `%${value}%`);
            break;
          case 'in':
            query = query.in(column, value as any[]);
            break;
        }
      });
    }

    if (options.orderBy) {
      query = query.order(options.orderBy.column, { ascending: options.orderBy.ascending });
    }

    if (options.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Error fetching data from ${table}: ${error.message}`);
    }

    // Use direct type assertion to prevent recursive type issues
    return (data || []) as T[];
  } catch (error) {
    console.error('Error in fetchData:', error);
    throw error;
  }
};

export const fetchById = async <T>(
  table: ValidTableName, 
  id: string | number
): Promise<T | null> => {
  try {
    validateTable(table);

    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error fetching data from ${table} with ID ${id}:`, error.message);
      return null;
    }

    // Use direct type assertion to prevent recursive type issues
    return data as T;
  } catch (error) {
    console.error(`Error in fetchById for table ${table} with ID ${id}:`, error);
    return null;
  }
};
