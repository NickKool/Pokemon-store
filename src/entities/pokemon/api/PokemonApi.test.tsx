import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PokemonApi } from './PokemonApi';

describe('PokemonApi', () => {
  const fetchMock = vi.fn();
  window.fetch = fetchMock;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getByName', () => {
    it('should return an array with Pokemon on a successful request', async () => {
      const mockPokemon = { id: 25, name: 'pikachu' };
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => mockPokemon,
      });
      const result = await PokemonApi.getByName('  Pikachu  ');
      expect(fetchMock).toHaveBeenCalledWith('https://pokeapi.co/api/v2//pokemon/pikachu');
      expect(result).toEqual([mockPokemon]);
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
          results: [{ url: 'url-to-pika' }, { url: 'url-to-bulba' }],
        }),
      });
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => ({ id: 1, name: 'pokemon' }),
      });
      const result = await PokemonApi.getAll();
      expect(fetchMock).toHaveBeenCalledTimes(3);
      expect(result).toHaveLength(2);
    });

    it('should throw an error if the list fails to load', async () => {
      fetchMock.mockResolvedValueOnce({ ok: false });
      await expect(PokemonApi.getAll()).rejects.toThrow('Error loading list');
    });
  });
});
