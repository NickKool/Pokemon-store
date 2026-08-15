import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import { ThemeProvider } from '@/shared/model';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const mockRefreshFn = vi.fn();
vi.mock('@/entities/pokemon', () => ({
  useRefreshPokemons: () => mockRefreshFn,
}));

vi.mock('@/widgets/selection-panel', () => ({
  SelectionPanel: () => <div data-testid="mock-selection-panel" />,
}));

describe('Layout Component with TanStack Query', () => {
  let testQueryClient: QueryClient;

  beforeEach(() => {
    testQueryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    mockRefreshFn.mockClear();
  });

  const renderLayout = (initialRoute = '/') => {
    return render(
      <QueryClientProvider client={testQueryClient}>
        <ThemeProvider>
          <MemoryRouter initialEntries={[initialRoute]}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<div data-testid="home-page">Home Content</div>} />
                <Route path="about" element={<div data-testid="about-page">About Content</div>} />
              </Route>
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </QueryClientProvider>
    );
  };

  it('should render the logo image, navigation links, theme and refresh buttons', () => {
    renderLayout('/');

    const logoImg = screen.getByRole('img', { name: /logo/i });
    expect(logoImg).toBeInTheDocument();
    expect(logoImg).toHaveAttribute('src', '/logo.png');

    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about us/i })).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /dark/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /refresh cache/i })).toBeInTheDocument();
  });

  it('should correctly highlight the active Home link', () => {
    renderLayout('/');

    const homeLink = screen.getByRole('link', { name: /home/i });
    const aboutLink = screen.getByRole('link', { name: /about us/i });

    expect(homeLink).toHaveClass('text-input-focus', 'font-semibold');
    expect(aboutLink).toHaveClass('text-sub-text');
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  it('should switch the active class when on the About Us page', () => {
    renderLayout('/about');

    const homeLink = screen.getByRole('link', { name: /home/i });
    const aboutLink = screen.getByRole('link', { name: /about us/i });

    expect(aboutLink).toHaveClass('text-input-focus', 'font-semibold');
    expect(homeLink).toHaveClass('text-sub-text');
    expect(screen.getByTestId('about-page')).toBeInTheDocument();
  });

  it('should toggle theme text on button click', () => {
    renderLayout('/');

    const toggleButton = screen.getByRole('button', { name: /dark/i });
    fireEvent.click(toggleButton);

    expect(screen.getByRole('button', { name: /light/i })).toBeInTheDocument();
  });

  it('should call useRefreshPokemons function on "Refresh cache" button click', () => {
    renderLayout('/');
    const refreshButton = screen.getByRole('button', { name: /refresh cache/i });
    fireEvent.click(refreshButton);
    expect(mockRefreshFn).toHaveBeenCalledTimes(1);
  });
});
