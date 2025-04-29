
// Re-export all API functionality
export * from './rateLimiter';
export * from './sanitizer';
export * from './tableValidator';
export * from './types';
export * from './operations/types';
export { fetchData, fetchById } from './operations/fetch';
export { updateData, createData } from './operations/update';
export { deleteData } from './operations/delete';
export * from './helpers';
export * from './useSecureData';
export { secureClient } from './secureClient';
