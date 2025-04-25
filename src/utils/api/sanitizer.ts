
import DOMPurify from 'dompurify';

export const sanitizeInput = (input: string | Record<string, any>): any => {
  if (typeof input === 'string') {
    return DOMPurify.sanitize(input);
  } else if (typeof input === 'object' && input !== null) {
    const sanitized: Record<string, any> = {};
    for (const [key, value] of Object.entries(input)) {
      if (typeof value === 'string') {
        sanitized[key] = DOMPurify.sanitize(value);
      } else {
        sanitized[key] = value;
      }
    }
    return sanitized;
  }
  return input;
};
