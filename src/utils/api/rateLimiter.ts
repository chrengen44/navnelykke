
// Rate limiting functionality
interface RateLimitConfig {
  maxRequests: number;
  timeWindow: number;
}

export const API_RATE_LIMITS: Record<string, RateLimitConfig> = {
  default: { maxRequests: 30, timeWindow: 60000 }, // 30 requests per minute
  search: { maxRequests: 10, timeWindow: 30000 },  // 10 search requests per 30 seconds
  update: { maxRequests: 5, timeWindow: 10000 }    // 5 updates per 10 seconds
};

const requestCounts: Record<string, { count: number; timestamp: number }> = {};

export const checkRateLimit = (endpoint: string): boolean => {
  const now = Date.now();
  const limits = API_RATE_LIMITS[endpoint] || API_RATE_LIMITS.default;
  
  if (!requestCounts[endpoint]) {
    requestCounts[endpoint] = { count: 0, timestamp: now };
    return true;
  }

  if (now - requestCounts[endpoint].timestamp > limits.timeWindow) {
    requestCounts[endpoint] = { count: 0, timestamp: now };
    return true;
  }

  return requestCounts[endpoint].count < limits.maxRequests;
};

export const incrementRequestCount = (endpoint: string): void => {
  const now = Date.now();
  
  if (!requestCounts[endpoint]) {
    requestCounts[endpoint] = { count: 1, timestamp: now };
  } else {
    requestCounts[endpoint].count += 1;
  }
};
