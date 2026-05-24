import { useQuery } from '@tanstack/react-query';
import { PokemonApi } from './PokemonApi';
import { searchService } from '@/features/search-pokemon';
import { queryClient } from '@/shared/api/queryClient';

const DETAILED_PANEL_DELAY = 1500;
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const usePokemonDetailsQuery = (id: string | undefined) => {
  return useQuery(
    {
      queryKey: ['pokemons', 'details', id],
      queryFn: async () => {
        if (!id) throw new Error('ID is required');

        const response = await searchService.execute(id, 1, 1);
        const data = response.pokemons[0];

        if (!data) throw new Error('Pokemon not found');

        await sleep(DETAILED_PANEL_DELAY);

        return data;
      },
      enabled: !!id,
      networkMode: 'always',
    },
    queryClient
  );
};

export const usePokemonsQuery = (searchTerm: string, page: number, limit: number) => {
  return useQuery(
    {
      queryKey: ['pokemons', { searchTerm, page, limit }],
      queryFn: () => searchService.execute(searchTerm, page, limit),
      networkMode: 'always',
    },
    queryClient
  );
};

export const usePokemonList = (page: number, limit: number = 12) => {
  return useQuery({
    queryKey: ['pokemons', 'list', { page, limit }],
    queryFn: () => PokemonApi.getAll(page, limit),
  });
};

export const usePokemonByName = (name: string) => {
  const trimmedName = name.trim().toLowerCase();

  return useQuery({
    queryKey: ['pokemons', 'search', trimmedName],
    queryFn: () => PokemonApi.getByName(trimmedName),
    enabled: trimmedName.length > 0,
  });
};

export const useRefreshPokemons = () => {
  return async () => {
    await queryClient.resetQueries({
      queryKey: ['pokemons'],
      exact: false,
    });
  };
};
