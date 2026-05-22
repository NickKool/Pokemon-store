import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PokemonCard } from './PokemonCard';
import { useAppStore } from '@/shared/model';
import { describe, it, expect, vi, beforeEach } from 'vitest';

type OriginalSelector = Parameters<typeof useAppStore>[0];

type StoreMock = <T>(selector: (state: Parameters<OriginalSelector>[0]) => T) => T;

vi.mock('@/shared/model', () => ({
  useAppStore: vi.fn<StoreMock>(),
}));

describe('PokemonCard', () => {
  const mockData = {
    id: 25,
    name: 'Pikachu',
    description: 'Mouse Pokemon',
    imageUrl: 'https://githubusercontent.com',
  };

  const mockToggleSelectItem = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useAppStore).mockImplementation(
      <T,>(selector: (state: Parameters<OriginalSelector>[0]) => T): T =>
        selector({
          selectedIds: [],
          toggleSelectItem: mockToggleSelectItem,
          pokemons: [],
          setPokemons: vi.fn(),
          clearSelection: vi.fn(),
        } as Parameters<OriginalSelector>[0])
    );
  });

  it('should correctly display the name, description and image', () => {
    render(
      <MemoryRouter>
        <PokemonCard {...mockData} />
      </MemoryRouter>
    );

    expect(screen.getByText(mockData.name)).toBeInTheDocument();
    expect(screen.getByText(mockData.description)).toBeInTheDocument();

    const image = screen.getByAltText(mockData.name) as HTMLImageElement;
    expect(image).toBeInTheDocument();

    expect(image.getAttribute('src')).toBe(mockData.imageUrl);
  });

  it('should apply the correct CSS class for styling', () => {
    render(
      <MemoryRouter>
        <PokemonCard {...mockData} />
      </MemoryRouter>
    );

    const image = screen.getByAltText(mockData.name);
    expect(image).toHaveClass('object-contain');
  });

  it('should generate correct link URL with current id', () => {
    render(
      <MemoryRouter initialEntries={['/?page=3']}>
        <PokemonCard {...mockData} />
      </MemoryRouter>
    );

    const cardLink = screen.getByRole('link');
    expect(cardLink).toHaveAttribute('href', '/pokemon/25?page=3');
  });

  it('should call toggleSelectItem when checkbox is clicked', () => {
    render(
      <MemoryRouter>
        <PokemonCard {...mockData} />
      </MemoryRouter>
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockToggleSelectItem).toHaveBeenCalledTimes(1);
    expect(mockToggleSelectItem).toHaveBeenCalledWith(mockData.id);
  });

  it('should apply active border classes when item is selected', () => {
    vi.mocked(useAppStore).mockImplementation(
      <T,>(selector: (state: Parameters<OriginalSelector>[0]) => T): T =>
        selector({
          selectedIds: [mockData.id],
          toggleSelectItem: mockToggleSelectItem,
          pokemons: [],
          setPokemons: vi.fn(),
          clearSelection: vi.fn(),
        } as Parameters<OriginalSelector>[0])
    );

    render(
      <MemoryRouter>
        <PokemonCard {...mockData} />
      </MemoryRouter>
    );

    const cardLink = screen.getByRole('link');
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;

    expect(cardLink).toHaveClass('border-input-focus', 'ring-2', 'ring-input-focus');
    expect(checkbox.checked).toBe(true);
  });
});
