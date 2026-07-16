import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PokemonDetail } from './PokemonDetail';
import { usePokemonDetailsQuery } from '@/entities/pokemon';
import { useParams } from 'react-router-dom';
import type { UseQueryResult } from '@tanstack/react-query';
import type { PokemonData } from '@/features/search-pokemon';

vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
}));

vi.mock('@/entities/pokemon', () => ({
  usePokemonDetailsQuery: vi.fn(),
}));

vi.mock('@/shared/ui', () => ({
  Spinner: () => <div data-testid="spinner">Loading...</div>,
}));

describe('PokemonDetail Component with TanStack Query', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Стандартный рабочий ID для большинства тестов
    vi.mocked(useParams).mockReturnValue({ id: 'pikachu' });
  });

  it('should display fallback text if id is not provided', () => {
    vi.mocked(useParams).mockReturnValue({ id: undefined });

    // ИСПРАВЛЕНО: Строгая типизация через Partial без any
    const mockEmptyResult: Partial<UseQueryResult<PokemonData, Error>> = {
      data: undefined,
      isLoading: false,
      isError: false,
      error: null,
    };

    vi.mocked(usePokemonDetailsQuery).mockReturnValue(
      mockEmptyResult as UseQueryResult<PokemonData, Error>
    );

    render(<PokemonDetail />);

    expect(screen.getByText('No pokemon selected')).toBeInTheDocument();
  });

  it('should display a spinner while loading data', async () => {
    const mockLoadingResult: Partial<UseQueryResult<PokemonData, Error>> = {
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
      status: 'pending',
    };

    vi.mocked(usePokemonDetailsQuery).mockReturnValue(
      mockLoadingResult as UseQueryResult<PokemonData, Error>
    );

    render(<PokemonDetail />);

    await waitFor(() => {
      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });
  });

  it('should display an error message if the API request fails', async () => {
    const mockErrorResult: Partial<UseQueryResult<PokemonData, Error>> = {
      data: undefined,
      isLoading: false,
      isError: true,
      error: new Error('API Error'),
    };

    vi.mocked(usePokemonDetailsQuery).mockReturnValue(
      mockErrorResult as UseQueryResult<PokemonData, Error>
    );

    render(<PokemonDetail />);

    const errorElement = await screen.findByText('API Error');
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveClass('text-red-500');
  });

  it('should display pokemon details when data is successfully fetched or retrieved from cache', async () => {
    const mockSuccessResult: Partial<UseQueryResult<PokemonData, Error>> = {
      data: {
        id: 25,
        name: 'pikachu',
        image: 'pikachu-image.png',
        description: 'Electric type pokemon with high speed.',
      },
      isLoading: false,
      isError: false,
      error: null,
    };

    vi.mocked(usePokemonDetailsQuery).mockReturnValue(
      mockSuccessResult as UseQueryResult<PokemonData, Error>
    );

    render(<PokemonDetail />);

    const nameElement = await screen.findByText('pikachu');
    expect(nameElement).toBeInTheDocument();

    const imageElement = screen.getByRole('img');
    expect(imageElement).toHaveAttribute('src', 'pikachu-image.png');
    expect(imageElement).toHaveAttribute('alt', 'pikachu');

    const descriptionElement = screen.getByText(/Electric type pokemon/i);
    expect(descriptionElement).toBeInTheDocument();
  });
});
