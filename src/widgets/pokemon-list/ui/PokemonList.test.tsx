import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { PokemonList } from './PokemonList';
import type { PokemonData } from '@/features/search-pokemon';

vi.mock('@/entities/pokemon', () => ({
  PokemonCard: ({ name }: { name: string }) => <div data-testid="pokemon-card">{name}</div>,
}));

describe('PokemonList', () => {
  const mockPokemons: PokemonData[] = [
    { id: 1, name: 'Bulbasaur', description: 'Seed pokemon', image: 'url1' },
    { id: 2, name: 'Ivysaur', description: 'Seed pokemon', image: 'url2' },
  ];

  it('should return null and render nothing if the pokemon array is empty', () => {
    const { container } = render(<PokemonList pokemons={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render a list of Pokemon cards when data is provided', () => {
    render(<PokemonList pokemons={mockPokemons} />);

    const cards = screen.getAllByTestId('pokemon-card');
    expect(cards).toHaveLength(mockPokemons.length);
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Ivysaur')).toBeInTheDocument();
  });
});
