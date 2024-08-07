// Standard: key is `{GROUP}${key}`
// Example: `AI_CONTEXT$grid`

import { useEffect, useState } from "react";

export function getPersistentData(
  group: string,
  key: string,
  defaultValue: any = null,
): any {
  if (typeof window === "undefined") {
    // This is to prevent SSR from breaking.
    return defaultValue;
  }

  const item = localStorage.getItem(`${group}$${key}`);

  if (!item) {
    return defaultValue;
  }

  return item ? JSON.parse(item) : item;
}

export function saveData<T>(
  group: string,
  key: string,
  value: T | ((prev: T) => T),
): void {
  if (value instanceof Function) {
    value = value(getPersistentData(group, key));
  }
  localStorage.setItem(`${group}$${key}`, JSON.stringify(value));
}

export function usePersistentState<T>(
  group: string,
  key: string,
  defaultValue: T,
) {
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    setValue(getPersistentData(group, key, defaultValue));
  }, []);

  const setPersistentValue = (newValue: T | ((prev: T) => T)) => {
    setValue(newValue);
    saveData(group, key, newValue);
  };

  return [value, setPersistentValue, setValue] as const;
}

export function clearPersistentGroup(group: string) {
  // There shouldn't be a lot of objects in localStorage, so this is fine.
  const keys = Object.keys(localStorage).filter((key) =>
    key.startsWith(`${group}$`),
  );

  keys.forEach((key) => {
    localStorage.removeItem(key);
  });
}

export function persistentGroupExists(group: string): boolean {
  for (const key in localStorage) {
    if (key.startsWith(`${group}$`)) {
      return true;
    }
  }

  return false;
}

export function persistentKeyExists(group: string, key: string): boolean {
  return localStorage.getItem(`${group}$${key}`) !== null;
}
