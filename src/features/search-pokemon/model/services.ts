import { PokemonApi } from '@/entities/pokemon';
import type { RawPokemon, PokemonResponse } from '@/entities/pokemon/api/PokemonApi';

const STORAGE_KEY = 'pokemonSearchTerm';

export const getSavedSearchTerm = (): string => {
  return localStorage.getItem(STORAGE_KEY) || '';
};

export interface PokemonData {
  id: number;
  name: string;
  description: string;
  image: string;
}

export interface SearchServiceResult {
  pokemons: PokemonData[];
  totalCount: number;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const searchService = {
  async execute(term?: string, page: number = 1, limit: number = 12): Promise<SearchServiceResult> {
    const query = term !== undefined ? term : getSavedSearchTerm();
    const trimmed = query.trim();

    const apiResponse: PokemonResponse = trimmed
      ? await PokemonApi.getByName(trimmed)
      : await PokemonApi.getAll(page, limit);

    await sleep(2000);

    const mappedPokemons = apiResponse.results.map(
      (item: RawPokemon): PokemonData => ({
        id: item.id,
        name: item.name,
        description: item.abilities.map((a) => a.ability.name).join(', '),
        image: item.sprites.other['official-artwork'].front_default || item.sprites.front_default,
      })
    );

    return {
      pokemons: mappedPokemons,
      totalCount: apiResponse.totalCount,
    };
  },
};
