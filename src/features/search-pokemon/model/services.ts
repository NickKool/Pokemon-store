import { PokemonApi } from '@/entities/pokemon';
import type { RawPokemon } from '@/entities/pokemon/api/PokemonApi';

const STORAGE_KEY = 'pokemonSearchTerm';

export const getSavedSearchTerm = (): string => {
  return localStorage.getItem(STORAGE_KEY) || '';
};

export const saveSearchTerm = (term: string): void => {
  const trimmed = term.trim();
  if (!trimmed) {
    localStorage.removeItem(STORAGE_KEY);
  } else {
    localStorage.setItem(STORAGE_KEY, trimmed);
  }
};

export const isSameSearch = (newTerm: string): boolean => {
  return newTerm.trim() === localStorage.getItem(STORAGE_KEY);
};

export interface PokemonData {
  id: number;
  name: string;
  description: string;
  image: string;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const searchService = {
  async execute(term?: string): Promise<PokemonData[]> {
    const query = term !== undefined ? term : getSavedSearchTerm();
    const trimmed = query.trim();

    const rawData: RawPokemon[] = trimmed
      ? await PokemonApi.getByName(trimmed)
      : await PokemonApi.getAll();

    await sleep(2000);

    return rawData.map(
      (item: RawPokemon): PokemonData => ({
        id: item.id,
        name: item.name,
        description: item.abilities.map((a) => a.ability.name).join(', '),
        image: item.sprites.other['official-artwork'].front_default || item.sprites.front_default,
      })
    );
  },
};
