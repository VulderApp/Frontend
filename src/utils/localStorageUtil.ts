export const saveItem = (key: string, value: string) =>
  localStorage.setItem(key, value);

export const getItem = (key: string): string | null =>
  localStorage.getItem(key);

export const getBooleanItem = (key: string): boolean | null => {
  const value = localStorage.getItem(key);

  return value === "true" || value === null;
};

export const deleteItem = (key: string): void => localStorage.removeItem(key);
