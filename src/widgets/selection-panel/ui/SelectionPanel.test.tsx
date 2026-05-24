import { render, screen, fireEvent } from '@testing-library/react';
import { SelectionPanel } from './SelectionPanel';
import { useAppStore } from '@/shared/model';
import { downloadCsv } from '@/shared/lib';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type AppState = Parameters<typeof useAppStore> extends (state: infer S) => unknown ? S : never;
type StoreMock = <T>(selector: (state: AppState) => T) => T;

vi.mock('@/shared/model', () => ({
  useAppStore: vi.fn<StoreMock>(),
}));

vi.mock('@/shared/lib', () => ({
  downloadCsv: vi.fn(),
}));

describe('SelectionPanel Component with TanStack Query Cache', () => {
  const mockPokemons = [
    { id: 25, name: 'Pikachu', image: 'pika.png', description: 'Electric' },
    { id: 1, name: 'Bulbasaur', image: 'bulb.png', description: 'Grass' },
    { id: 4, name: 'Charmander', image: 'char.png', description: 'Fire' },
  ];

  const mockClearSelection = vi.fn();
  let testQueryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();

    testQueryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    testQueryClient.setQueryData(['pokemons', { searchTerm: '', page: 1, limit: 20 }], {
      pokemons: mockPokemons,
      totalCount: 3,
    });
  });

  const renderWithProvider = (ui: React.ReactElement) => {
    return render(<QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>);
  };

  it('should return null (render nothing) when selectedCount is 0', () => {
    vi.mocked(useAppStore).mockImplementation(
      <T,>(selector: (state: AppState) => T): T =>
        selector({
          selectedIds: [],
          clearSelection: mockClearSelection,
        } as unknown as AppState)
    );

    const { container } = renderWithProvider(<SelectionPanel />);
    expect(container.firstChild).toBeNull();
  });

  it('should correctly display the count of selected items', () => {
    vi.mocked(useAppStore).mockImplementation(
      <T,>(selector: (state: AppState) => T): T =>
        selector({
          selectedIds: [25, 1],
          clearSelection: mockClearSelection,
        } as unknown as AppState)
    );

    renderWithProvider(<SelectionPanel />);

    expect(screen.getByText('Selected items:')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should call clearSelection when "Unselect All" button is clicked', () => {
    vi.mocked(useAppStore).mockImplementation(
      <T,>(selector: (state: AppState) => T): T =>
        selector({
          selectedIds: [25],
          clearSelection: mockClearSelection,
        } as unknown as AppState)
    );

    renderWithProvider(<SelectionPanel />);

    const clearButton = screen.getByRole('button', { name: /unselect all/i });
    fireEvent.click(clearButton);

    expect(mockClearSelection).toHaveBeenCalledTimes(1);
  });

  it('should filter selected pokemons from TanStack cache and trigger downloadCsv when "Download" is clicked', () => {
    vi.mocked(useAppStore).mockImplementation(
      <T,>(selector: (state: AppState) => T): T =>
        selector({
          selectedIds: [25, 1],
          clearSelection: mockClearSelection,
        } as unknown as AppState)
    );

    renderWithProvider(<SelectionPanel />);

    const downloadButton = screen.getByRole('button', { name: /download/i });
    fireEvent.click(downloadButton);

    expect(downloadCsv).toHaveBeenCalledTimes(1);

    expect(downloadCsv).toHaveBeenCalledWith([
      { id: 25, name: 'Pikachu', image: 'pika.png', description: 'Electric' },
      { id: 1, name: 'Bulbasaur', image: 'bulb.png', description: 'Grass' },
    ]);
  });
});
