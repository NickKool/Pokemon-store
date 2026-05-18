import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PokemonDetail } from './PokemonDetail';
import { PokemonApi } from '@/entities/pokemon';

vi.mock('react-router-dom', () => ({
  useParams: () => ({ id: 'pikachu' }),
}));

vi.mock('@/entities/pokemon', () => ({
  PokemonApi: {
    getByName: vi.fn(),
  },
}));

describe('PokemonDetail Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should display a spinner while loading data', async () => {
    vi.mocked(PokemonApi.getByName).mockReturnValue(new Promise(() => {}));

    render(<PokemonDetail />);

    await waitFor(() => {
      const loadingIndicator = screen.queryByTestId('spinner') || screen.queryByText(/loading/i);
      expect(loadingIndicator).toBeInTheDocument();
    });
  });

  it('should display an error message if the API request fails', async () => {
    vi.mocked(PokemonApi.getByName).mockRejectedValue(new Error('API Error'));

    render(<PokemonDetail />);

    const errorElement = await screen.findByText('API Error');
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveClass('text-red-500');
  });

  it('should display an error message if the pokemon data is not found', async () => {
    vi.mocked(PokemonApi.getByName).mockResolvedValue({
      results: [],
      totalCount: 0,
    });

    render(<PokemonDetail />);

    const errorElement = await screen.findByText('Pokemon not found');
    expect(errorElement).toBeInTheDocument();
  });
});
