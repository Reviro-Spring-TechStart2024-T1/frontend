import { useEffect, useState } from 'react';

export default function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState(initialValue);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const storage = localStorage.getItem(key);

    if (storage) {
      setValue(JSON.parse(storage));
    }

    setIsInitialized(true);
  }, [key]);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value]);

  return [value, setValue] as const;
}
