const STORAGE_KEY = 'pokemonSearchTerm';

export const getSavedSearchTerm = (): string => {
  return localStorage.getItem(STORAGE_KEY) || '';
};

export const saveSearchTerm = (term: string): void => {
  const trimmed = term.trim();
  if (!trimmed) return;

  localStorage.setItem(STORAGE_KEY, trimmed);
};

export const isSameSearch = (newTerm: string): boolean => {
  return newTerm.trim() === localStorage.getItem(STORAGE_KEY);
};
