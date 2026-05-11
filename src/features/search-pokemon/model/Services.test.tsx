import { getSavedSearchTerm, saveSearchTerm, isSameSearch, searchService } from './services';
import { PokemonApi } from '@/entities/pokemon';
import type { RawPokemon } from '@/entities/pokemon/api/PokemonApi';

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
    it('should save and receive the search query', () => {
      saveSearchTerm('pikachu');
      expect(getSavedSearchTerm()).toBe('pikachu');
    });

    it('should delete the key from storage if an empty string is passed', () => {
      localStorage.setItem('pokemonSearchTerm', 'charizard');
      saveSearchTerm('  ');
      expect(localStorage.getItem('pokemonSearchTerm')).toBeNull();
    });

    it('isSameSearch should compare values ​​correctly', () => {
      saveSearchTerm('bulbasaur');
      expect(isSameSearch('bulbasaur')).toBe(true);
      expect(isSameSearch('  bulbasaur  ')).toBe(true);
      expect(isSameSearch('pikachu')).toBe(false);
    });
  });

  describe('searchService.execute', () => {
    const mockRawPokemon: RawPokemon[] = [
      {
        id: 25,
        name: 'pikachu',
        abilities: [{ ability: { name: 'static' } }],
        sprites: {
          front_default: 'small.png',
          other: { 'official-artwork': { front_default: 'big.png' } },
        },
      },
    ];

    it('should map raw data from the API to PokemonData', async () => {
      vi.mocked(PokemonApi.getByName).mockResolvedValue(mockRawPokemon);
      const promise = searchService.execute('pikachu');
      await vi.advanceTimersByTimeAsync(2000);
      const result = await promise;

      expect(result[0]).toEqual({
        id: 25,
        name: 'pikachu',
        description: 'static',
        image: 'big.png',
      });
    });

    it('should use the value from localStorage if term is not passed', async () => {
      saveSearchTerm('charizard');
      vi.mocked(PokemonApi.getByName).mockResolvedValue(mockRawPokemon);
      const promise = searchService.execute();
      await vi.advanceTimersByTimeAsync(2000);
      await promise;
      expect(PokemonApi.getByName).toHaveBeenCalledWith('charizard');
    });

    it('should call getAll() if the query is empty', async () => {
      vi.mocked(PokemonApi.getAll).mockResolvedValue([]);
      const promise = searchService.execute('');
      await vi.advanceTimersByTimeAsync(2000);
      await promise;
      expect(PokemonApi.getAll).toHaveBeenCalled();
    });
    it('should use a backup image if the main one is missing', async () => {
      const pokemonWithoutArt = [
        {
          id: 1,
          name: 'fallback',
          abilities: [],
          sprites: {
            front_default: 'fallback.png',
            other: { 'official-artwork': { front_default: null } },
          },
        },
      ] as unknown as RawPokemon[];
      vi.mocked(PokemonApi.getByName).mockResolvedValue(pokemonWithoutArt);
      const promise = searchService.execute('test');
      await vi.advanceTimersByTimeAsync(2000);
      const result = await promise;
      expect(result[0].image).toBe('fallback.png');
    });
  });
});
