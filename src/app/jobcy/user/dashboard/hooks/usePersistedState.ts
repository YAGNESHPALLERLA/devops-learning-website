import { useState, useEffect } from 'react';

/**
 * Custom hook for persisting state to localStorage
 * @param key - The localStorage key
 * @param defaultValue - The default value if nothing is stored
 * @returns [value, setValue] - Similar to useState
 */
export function usePersistedState<T>(
  key: string,
  defaultValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return defaultValue;
    }
    
    try {
      const savedValue = localStorage.getItem(key);
      if (savedValue === null) {
        return defaultValue;
      }
      return JSON.parse(savedValue);
    } catch (error) {
      console.error(`Error parsing saved state for key "${key}":`, error);
      return defaultValue;
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      if (state === null || state === undefined) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(state));
      }
    } catch (error) {
      console.error(`Error saving state for key "${key}":`, error);
    }
  }, [key, state]);

  return [state, setState];
}

/**
 * Hook for persisting simple string values
 */
export function usePersistedString(key: string, defaultValue: string = '') {
  return usePersistedState(key, defaultValue);
}

/**
 * Hook for persisting boolean values
 */
export function usePersistedBoolean(key: string, defaultValue: boolean = false) {
  return usePersistedState(key, defaultValue);
}

/**
 * Hook for persisting number values
 */
export function usePersistedNumber(key: string, defaultValue: number = 0) {
  return usePersistedState(key, defaultValue);
}
