import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NotFoundPage } from './NotFoundPage';

describe('NotFoundPage Component', () => {
  it('should render 404 error messages correctly', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1, name: '404' })).toBeInTheDocument();

    expect(screen.getByRole('heading', { level: 2, name: /page not found/i })).toBeInTheDocument();

    expect(screen.getByText('The page you are looking for does not exist.')).toBeInTheDocument();
  });

  it('should contain a functional NavLink to return to the home page', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    const homeLink = screen.getByRole('link', { name: /return to home/i });

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
