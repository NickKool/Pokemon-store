import { render, screen, waitFor } from '@testing-library/react';
import { MainPage } from './MainPage';
import { searchService } from '@/features/search-pokemon';
import { type PokemonListProps } from '@/widgets/pokemon-list/ui/PokemonList';
import { type PokemonData } from '@/features/search-pokemon';

vi.mock('@/features/search-pokemon', () => ({
  searchService: {
    execute: vi.fn(),
  },
  CrashButton: () => <button>Error Boundary</button>,
}));

vi.mock('@/widgets/search-bar', () => ({
  SearchBar: ({ onSearch }: { onSearch: (t: string) => void }) => (
    <button onClick={() => onSearch('pikachu')}>Find</button>
  ),
}));

vi.mock('@/widgets/pokemon-list', () => ({
  PokemonList: ({ pokemons, isLoading, error }: PokemonListProps) => (
    <div data-testid="list">
      {isLoading && <span>Spinner</span>}
      {error && <span>{error}</span>}
      {pokemons.map((p: PokemonData) => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  ),
}));

describe('MainPage', () => {
  const mockPokemons = [
    { id: 1, name: 'Bulbasaur', description: 'Seed pokemon', image: 'url1' },
    { id: 2, name: 'Pikachu', description: 'Seed pokemon', image: 'url2' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should request data upon mounting and display it', async () => {
    vi.mocked(searchService.execute).mockResolvedValue(mockPokemons);
    render(<MainPage />);
    expect(searchService.execute).toHaveBeenCalledWith(undefined);
    await waitFor(() => {
      expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
      expect(screen.getByText('Pikachu')).toBeInTheDocument();
    });
  });

  it('should handle errors when searching', async () => {
    const errorMsg = 'API Error';
    vi.mocked(searchService.execute).mockRejectedValue(new Error(errorMsg));
    render(<MainPage />);
    await waitFor(() => {
      expect(screen.getByText(errorMsg)).toBeInTheDocument();
    });
  });

  it('should display "Unknown error" if a non-standard exception is thrown', async () => {
    vi.mocked(searchService.execute).mockRejectedValue('Something went wrong');
    render(<MainPage />);
    await waitFor(() => {
      expect(screen.getByText('Unknown error')).toBeInTheDocument();
    });
  });

  it('should update the list when calling search from SearchBar', async () => {
    vi.mocked(searchService.execute).mockResolvedValue([]);
    render(<MainPage />);
    vi.mocked(searchService.execute).mockResolvedValue([mockPokemons[1]]);
    const searchBtn = screen.getByText('Find');
    searchBtn.click();
    await waitFor(() => {
      expect(searchService.execute).toHaveBeenCalledWith('pikachu');
      expect(screen.getByText('Pikachu')).toBeInTheDocument();
    });
  });
});
