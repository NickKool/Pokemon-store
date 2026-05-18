import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';

describe('Layout Component', () => {
  const renderLayout = (initialRoute = '/') => {
    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<div data-testid="home-page">Home Content</div>} />
            <Route path="about" element={<div data-testid="about-page">About Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
  };

  it('should render the logo image and navigation links', () => {
    renderLayout('/');

    const logoImg = screen.getByRole('img', { name: /logo/i });
    expect(logoImg).toBeInTheDocument();
    expect(logoImg).toHaveAttribute('src', '/React-2026-Q2/logo.png');

    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about us/i })).toBeInTheDocument();
  });

  it('should correctly highlight the active Home link', () => {
    renderLayout('/');

    const homeLink = screen.getByRole('link', { name: /home/i });
    const aboutLink = screen.getByRole('link', { name: /about us/i });

    expect(homeLink).toHaveClass('text-yellow-400', 'font-semibold');
    expect(aboutLink).toHaveClass('text-gray-300');
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  it('should switch the active class when on the About Us page', () => {
    renderLayout('/about');

    const homeLink = screen.getByRole('link', { name: /home/i });
    const aboutLink = screen.getByRole('link', { name: /about us/i });

    expect(aboutLink).toHaveClass('text-yellow-400', 'font-semibold');
    expect(homeLink).toHaveClass('text-gray-300');
    expect(screen.getByTestId('about-page')).toBeInTheDocument();
  });
});
