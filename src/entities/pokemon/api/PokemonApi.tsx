export interface RawPokemon {
  id: number;
  name: string;
  abilities: { ability: { name: string } }[];
  sprites: {
    front_default: string;
    other: {
      'official-artwork': { front_default: string };
    };
  };
}

export interface PokemonResponse {
  results: RawPokemon[];
  totalCount: number;
}

const BASE_URL = 'https://pokeapi.co/api/v2/';

export const PokemonApi = {
  async getAll(page: number = 1, limit: number = 12): Promise<PokemonResponse> {
    const offset = (page - 1) * limit;
    const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);

    if (!response.ok) throw new Error('Error loading list');

    const data = await response.json();
    const totalCount = data.count;

    const detailedData: RawPokemon[] = await Promise.all(
      data.results.map((p: { url: string }) => fetch(p.url).then((res) => res.json()))
    );

    return {
      results: detailedData,
      totalCount,
    };
  },

  async getByName(name: string): Promise<PokemonResponse> {
    const response = await fetch(`${BASE_URL}/pokemon/${name.toLowerCase().trim()}`);

    if (!response.ok) {
      if (response.status === 404) throw new Error('Pokemon not found');
      throw new Error('Server error');
    }

    const data: RawPokemon = await response.json();
    return {
      results: [data],
      totalCount: 1,
    };
  },
};
