import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from './SearchBar';

const mockOnSearch = vi.fn();

describe('SearchBar Component', () => {
  beforeEach(() => {
    localStorage.clear();
    mockOnSearch.mockClear();
  });

  it('should renders search input and search button', () => {
    render(<SearchBar onSearch={mockOnSearch} isLoading={false} />);
    expect(screen.getByPlaceholderText(/pokemon name.../i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /find/i })).toBeInTheDocument();
  });

  it('should displays the previously saved search term from localStorage on mount', () => {
    localStorage.setItem('pokemonSearchTerm', 'pikachu');
    render(<SearchBar onSearch={mockOnSearch} isLoading={false} />);
    const input = screen.getByPlaceholderText(/pokemon name.../i) as HTMLInputElement;
    expect(input.value).toBe('pikachu');
  });

  it('should displays an empty input if there is no saved search term', () => {
    render(<SearchBar onSearch={mockOnSearch} isLoading={false} />);
    const input = screen.getByPlaceholderText(/pokemon name.../i) as HTMLInputElement;
    expect(input.value).toBe('');
  });

  it('should updates input value when user types text', () => {
    render(<SearchBar onSearch={mockOnSearch} isLoading={false} />);
    const input = screen.getByPlaceholderText(/pokemon name.../i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'charizard' } });
    expect(input.value).toBe('charizard');
  });

  it('should trims spaces and saves search term to localStorage when search button is clicked', () => {
    render(<SearchBar onSearch={mockOnSearch} isLoading={false} />);
    const input = screen.getByPlaceholderText(/pokemon name.../i);
    const button = screen.getByRole('button', { name: /find/i });
    fireEvent.change(input, { target: { value: '  pikachu  ' } });
    fireEvent.click(button);
    expect(localStorage.getItem('pokemonSearchTerm')).toBe('pikachu');
  });

  it('should calls onSearch callback with correct parameters', () => {
    render(<SearchBar onSearch={mockOnSearch} isLoading={false} />);
    const input = screen.getByPlaceholderText(/pokemon name.../i);
    const button = screen.getByRole('button', { name: /find/i });
    fireEvent.change(input, { target: { value: 'pikachu' } });
    fireEvent.click(button);
    expect(mockOnSearch).toHaveBeenCalledWith('pikachu');
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });

  it('should overwrites existing localStorage value during a new search', () => {
    localStorage.setItem('pokemonSearchTerm', 'old-value');
    render(<SearchBar onSearch={mockOnSearch} isLoading={false} />);
    const input = screen.getByPlaceholderText(/pokemon name.../i);
    const button = screen.getByRole('button', { name: /find/i });
    fireEvent.change(input, { target: { value: 'new-value' } });
    fireEvent.click(button);
    expect(localStorage.getItem('pokemonSearchTerm')).toBe('new-value');
  });
  it('should not call onSearch if the search term is the same as the saved one', () => {
    const term = 'pikachu';
    localStorage.setItem('pokemonSearchTerm', term);
    render(<SearchBar onSearch={mockOnSearch} isLoading={false} />);
    const button = screen.getByRole('button', { name: /find/i });
    fireEvent.click(button);
    expect(mockOnSearch).not.toHaveBeenCalled();
  });
});
