
import { LoginAttempt, MAX_ATTEMPTS, LOCKOUT_TIME } from "./types";

// Track login attempts to implement basic rate limiting
const loginAttempts: Record<string, LoginAttempt> = {};

// Function to check if login attempts are within limits
export const checkRateLimit = (email: string): boolean => {
  const normalizedEmail = email.toLowerCase();
  const now = Date.now();
  
  // Clean up expired entries
  Object.keys(loginAttempts).forEach(key => {
    if (now - loginAttempts[key].timestamp > LOCKOUT_TIME) {
      delete loginAttempts[key];
    }
  });
  
  if (loginAttempts[normalizedEmail]) {
    // Check if account is locked out
    if (
      loginAttempts[normalizedEmail].count >= MAX_ATTEMPTS &&
      now - loginAttempts[normalizedEmail].timestamp < LOCKOUT_TIME
    ) {
      return false;
    }
  } else {
    loginAttempts[normalizedEmail] = { count: 0, timestamp: now };
  }
  
  return true;
};

// Function to record a failed login attempt
export const recordFailedAttempt = (email: string): void => {
  const normalizedEmail = email.toLowerCase();
  const now = Date.now();
  
  if (!loginAttempts[normalizedEmail]) {
    loginAttempts[normalizedEmail] = { count: 1, timestamp: now };
  } else {
    loginAttempts[normalizedEmail].count += 1;
    loginAttempts[normalizedEmail].timestamp = now;
  }
};

// Function to reset login attempts counter on successful login
export const resetAttempts = (email: string): void => {
  const normalizedEmail = email.toLowerCase();
  if (loginAttempts[normalizedEmail]) {
    delete loginAttempts[normalizedEmail];
  }
};
