import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { MainPage } from './MainPage';
import { searchService } from '@/features/search-pokemon';
import { type PokemonListProps } from '@/widgets/pokemon-list/ui/PokemonList';
import { type PokemonData } from '@/features/search-pokemon';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/shared/api/queryClient';

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
      {pokemons?.map((p: PokemonData) => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  ),
}));

vi.mock('@/shared/ui/pagination', () => ({
  Pagination: ({
    currentPage,
    onPageChange,
  }: {
    currentPage: number;
    onPageChange: (p: number) => void;
  }) => (
    <button data-testid="pagination" onClick={() => onPageChange(currentPage + 1)}>
      Next Page
    </button>
  ),
}));

describe('MainPage Component integration tests', () => {
  const mockPokemons = [
    { id: 1, name: 'Bulbasaur', description: 'Seed pokemon', image: 'url1' },
    { id: 2, name: 'Pikachu', description: 'Seed pokemon', image: 'url2' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();

    queryClient.clear();

    queryClient.setDefaultOptions({
      queries: {
        retry: false,
        networkMode: 'always',
        gcTime: 0,
        staleTime: 0,
      },
    });

    vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(true);
  });

  const renderWithRouter = (initialEntries = ['/']) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={initialEntries}>
          <Routes>
            <Route path="/" element={<MainPage />}>
              <Route path="pokemon/:id" element={<div>Detail Panel</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );
  };

  it('should request data upon mounting and display it', async () => {
    vi.mocked(searchService.execute).mockResolvedValue({
      pokemons: mockPokemons,
      totalCount: 2,
    });

    renderWithRouter();

    expect(searchService.execute).toHaveBeenCalledWith('', 1, 20);

    await waitFor(() => {
      expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
      expect(screen.getByText('Pikachu')).toBeInTheDocument();
    });
  });

  it('should handle errors when searching', async () => {
    const errorMsg = 'API Error';
    vi.mocked(searchService.execute).mockRejectedValue(new Error(errorMsg));

    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByText(errorMsg)).toBeInTheDocument();
    });
  });

  it('should display "Unknown error" if a non-standard exception is thrown', async () => {
    vi.mocked(searchService.execute).mockImplementation(() => {
      throw { customMessage: 'Raw string or object exception' };
    });

    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByText('Unknown error')).toBeInTheDocument();
    });
  });

  it('should update the list when calling search from SearchBar', async () => {
    vi.mocked(searchService.execute).mockResolvedValue({ pokemons: [], totalCount: 0 });
    renderWithRouter();

    vi.mocked(searchService.execute).mockResolvedValue({
      pokemons: [mockPokemons[1]],
      totalCount: 1,
    });

    const searchBtn = screen.getByText('Find');
    searchBtn.click();

    await waitFor(() => {
      expect(searchService.execute).toHaveBeenCalledWith('pikachu', 1, 20);
      expect(screen.getByText('Pikachu')).toBeInTheDocument();
    });
  });

  it('should display offline message and hide list when browser is offline', async () => {
    vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(false);
    vi.mocked(searchService.execute).mockResolvedValue({
      pokemons: mockPokemons,
      totalCount: 2,
    });

    renderWithRouter();

    await waitFor(() => {
      expect(screen.queryByText('Bulbasaur')).not.toBeInTheDocument();
      expect(
        screen.getByText('No internet connection. Cannot display or refresh data.')
      ).toBeInTheDocument();
    });
  });
});
