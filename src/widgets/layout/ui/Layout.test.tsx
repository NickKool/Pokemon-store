import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import { ThemeProvider } from '@/shared/model';

describe('Layout Component', () => {
  const renderLayout = (initialRoute = '/') => {
    return render(
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
    );
  };

  it('should render the logo image, navigation links and theme button', () => {
    renderLayout('/');

    const logoImg = screen.getByRole('img', { name: /logo/i });
    expect(logoImg).toBeInTheDocument();
    expect(logoImg).toHaveAttribute('src', '/React-2026-Q2/logo.png');

    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about us/i })).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /dark/i })).toBeInTheDocument();
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
});
