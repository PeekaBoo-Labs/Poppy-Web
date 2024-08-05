// Standard: key is `{GROUP}${key}`
// Example: `AI_CONTEXT$grid`

import { useState } from "react";

export function getPersistentData(
  group: string,
  key: string,
  defaultValue: any = null,
): any {
  const item = localStorage.getItem(`${group}$${key}`);

  if (!item) {
    return defaultValue;
  }

  return JSON.parse(item);
}

export function saveData(group: string, key: string, value: any): void {
  localStorage.setItem(`${group}$${key}`, JSON.stringify(value));
}

export function usePersistentState<T>(
  group: string,
  key: string,
  defaultValue: T,
) {
  const [value, setValue] = useState<T>(() =>
    getPersistentData(group, key, defaultValue),
  );

  const setPersistentValue = (newValue: T) => {
    setValue(newValue);
    saveData(group, key, newValue);
  };

  return [value, setPersistentValue] as const;
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
