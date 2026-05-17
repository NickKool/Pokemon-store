import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';

describe('Layout Component', () => {
  it('should render header elements including links and the image logo', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Layout />
      </MemoryRouter>
    );

    const logoImg = screen.getByRole('img', { name: /logo/i });
    expect(logoImg).toBeInTheDocument();
    expect(logoImg).toHaveAttribute('src', 'logo.png');

    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about us/i })).toBeInTheDocument();
  });

  it('should correctly pass and render child routes through the <Outlet />', () => {
    render(
      <MemoryRouter initialEntries={['/test-page']}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="test-page" element={<div data-testid="child-page">Child Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();

    expect(screen.getByTestId('child-page')).toBeInTheDocument();
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });
});
