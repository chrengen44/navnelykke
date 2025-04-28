
import { VALID_TABLES, ValidTableName } from './tableValidator';

/**
 * Validates that the provided table name is allowed
 */
export const validateTable = (tableName: string): void => {
  if (!VALID_TABLES.includes(tableName as ValidTableName)) {
    throw new Error(`Invalid table name: ${tableName}`);
  }
};

/**
 * Sanitizes input data to prevent security issues
 */
export const sanitizeData = <T>(data: T): T => {
  // If data is an object, sanitize each property
  if (typeof data === 'object' && data !== null) {
    const sanitizedData = { ...data };
    
    // Sanitize all string values (basic sanitization)
    Object.keys(sanitizedData).forEach(key => {
      if (typeof sanitizedData[key] === 'string') {
        // Simple sanitization - replace script tags
        sanitizedData[key] = sanitizedData[key].replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
      }
    });
    
    return sanitizedData;
  }
  
  return data;
};
