export const saveItem = (key: string, value: string) =>
  localStorage.setItem(key, value);

export const getItem = (key: string): string | null =>
  localStorage.getItem(key);
