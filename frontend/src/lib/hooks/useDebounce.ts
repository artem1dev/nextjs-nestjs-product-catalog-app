// src/lib/hooks/useDebounce.ts
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Встановити таймер
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Очистити таймер при зміні 'value' або 'delay'
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}