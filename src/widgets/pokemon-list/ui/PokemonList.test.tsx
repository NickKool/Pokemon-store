import { render, screen } from '@testing-library/react';
import { PokemonList } from './PokemonList';

vi.mock('@/entities/pokemon', () => ({
  PokemonCard: ({ name }: { name: string }) => <div data-testid="pokemon-card">{name}</div>,
}));

vi.mock('@/shared/ui', () => ({
  Spinner: () => <div data-testid="spinner"></div>,
}));

describe('PokemonList', () => {
  const mockPokemons = [
    { id: 1, name: 'Bulbasaur', description: 'Seed pokemon', image: 'url1' },
    { id: 2, name: 'Ivysaur', description: 'Seed pokemon', image: 'url2' },
  ];

  it('should show a spinner when isLoading: true', () => {
    render(<PokemonList pokemons={[]} isLoading={true} error={null} />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should show e about the error if error is not reported null', () => {
    const errorMessage = 'Failed to fetch';
    render(<PokemonList pokemons={[]} isLoading={false} error={errorMessage} />);

    expect(screen.getByText('Loading error')).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('should render a list of Pokemon cards', () => {
    render(<PokemonList pokemons={mockPokemons} isLoading={false} error={null} />);

    const cards = screen.getAllByTestId('pokemon-card');
    expect(cards).toHaveLength(mockPokemons.length);
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Ivysaur')).toBeInTheDocument();
  });
});
