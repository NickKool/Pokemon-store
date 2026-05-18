import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { App } from './App';

vi.mock('@/app/styles/index.css', () => ({}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    RouterProvider: () => <div data-testid="mock-router">Mocked Router</div>,
  };
});

vi.mock('../providers/router/appRouter', () => ({
  appRouter: {},
}));

describe('App Component (Isolated)', () => {
  it('successfully embeds RouterProvider inside ErrorBoundary', () => {
    render(<App />);

    const routerElement = screen.getByTestId('mock-router');
    expect(routerElement).toBeInTheDocument();
    expect(routerElement).toHaveTextContent('Mocked Router');
  });
});
