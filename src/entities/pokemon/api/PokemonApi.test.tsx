import { PokemonApi } from './PokemonApi';

describe('PokemonApi', () => {
  const fetchMock = vi.fn();
  window.fetch = fetchMock;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getByName', () => {
    it('should return an object with results array on a successful request', async () => {
      const mockPokemon = { id: 25, name: 'pikachu' };
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => mockPokemon,
      });

      const result = await PokemonApi.getByName('  Pikachu  ');

      expect(fetchMock).toHaveBeenCalledWith('https://pokeapi.co/api/v2//pokemon/pikachu');

      expect(result).toEqual({
        results: [mockPokemon],
        totalCount: 1,
      });
    });

    it('should throw "Pokemon not found" on 404 error', async () => {
      fetchMock.mockResolvedValue({
        ok: false,
        status: 404,
      });
      await expect(PokemonApi.getByName('unknown')).rejects.toThrow('Pokemon not found');
    });

    it('should throw "Server error" for other network errors', async () => {
      fetchMock.mockResolvedValue({
        ok: false,
        status: 500,
      });
      await expect(PokemonApi.getByName('pikachu')).rejects.toThrow('Server error');
    });
  });

  describe('getAll', () => {
    it('should load the list and then the detailed data for each Pokemon', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          count: 1300,
          results: [{ url: 'url-to-pika' }, { url: 'url-to-bulba' }],
        }),
      });

      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => ({ id: 1, name: 'pokemon' }),
      });
      const result = await PokemonApi.getAll(1, 12);
      expect(fetchMock).toHaveBeenCalledTimes(3);

      expect(result.results).toHaveLength(2);
      expect(result.totalCount).toBe(1300);
      expect(result.results[0]).toEqual({ id: 1, name: 'pokemon' });
    });

    it('should throw an error if the list fails to load', async () => {
      fetchMock.mockResolvedValueOnce({ ok: false });
      await expect(PokemonApi.getAll()).rejects.toThrow('Error loading list');
    });
  });
});
