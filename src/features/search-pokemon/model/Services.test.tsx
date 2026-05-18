import { getSavedSearchTerm, searchService } from './services';
import { PokemonApi } from '@/entities/pokemon';
import type { PokemonResponse } from '@/entities/pokemon/api/PokemonApi';

vi.mock('@/entities/pokemon', () => ({
  PokemonApi: {
    getByName: vi.fn(),
    getAll: vi.fn(),
  },
}));

describe('search-pokemon services', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  describe('localStorage logic', () => {
    it('should receive the saved search query or empty string', () => {
      expect(getSavedSearchTerm()).toBe('');

      localStorage.setItem('pokemonSearchTerm', 'pikachu');
      expect(getSavedSearchTerm()).toBe('pikachu');
    });
  });

  describe('searchService.execute', () => {
    const mockApiResponse: PokemonResponse = {
      totalCount: 1,
      results: [
        {
          id: 25,
          name: 'pikachu',
          abilities: [{ ability: { name: 'static' } }],
          sprites: {
            front_default: 'small.png',
            other: {
              'official-artwork': { front_default: 'big.png' },
            },
          },
        },
      ],
    };

    it('should map raw data from the API to SearchServiceResult', async () => {
      vi.mocked(PokemonApi.getByName).mockResolvedValue(mockApiResponse);

      const promise = searchService.execute('pikachu');
      await vi.advanceTimersByTimeAsync(2000);
      const result = await promise;

      expect(result).toEqual({
        totalCount: 1,
        pokemons: [
          {
            id: 25,
            name: 'pikachu',
            description: 'static',
            image: 'big.png',
          },
        ],
      });
    });

    it('should use the value from localStorage if term is not passed', async () => {
      localStorage.setItem('pokemonSearchTerm', 'charizard');
      vi.mocked(PokemonApi.getByName).mockResolvedValue(mockApiResponse);

      const promise = searchService.execute();
      await vi.advanceTimersByTimeAsync(2000);
      await promise;

      expect(PokemonApi.getByName).toHaveBeenCalledWith('charizard');
    });

    it('should call getAll() if the query is empty', async () => {
      const emptyApiResponse: PokemonResponse = { totalCount: 0, results: [] };
      vi.mocked(PokemonApi.getAll).mockResolvedValue(emptyApiResponse);

      const promise = searchService.execute('');
      await vi.advanceTimersByTimeAsync(2000);
      await promise;

      expect(PokemonApi.getAll).toHaveBeenCalledWith(1, 12);
    });

    it('should use a backup image if the main one is missing', async () => {
      const apiResponseWithoutArt: PokemonResponse = {
        totalCount: 1,
        results: [
          {
            id: 1,
            name: 'fallback',
            abilities: [],
            sprites: {
              front_default: 'fallback.png',
              other: {
                'official-artwork': { front_default: null as unknown as string },
              },
            },
          },
        ],
      };

      vi.mocked(PokemonApi.getByName).mockResolvedValue(apiResponseWithoutArt);

      const promise = searchService.execute('test');
      await vi.advanceTimersByTimeAsync(2000);
      const result = await promise;

      expect(result.pokemons[0].image).toBe('fallback.png');
    });
  });
});
