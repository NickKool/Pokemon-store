import { render, screen } from '@testing-library/react';
import { App } from './App';

vi.mock('@/pages/main/index', () => ({
  MainPage: () => <div data-testid="main-page">Main Page Content</div>,
}));

vi.mock('../providers/ErrorBoundary/ErrorBoundary', () => ({
  ErrorBoundary: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="error-boundary">{children}</div>
  ),
}));

describe('App Component', () => {
  it('should render MainPage inside ErrorBoundary', () => {
    render(<App />);

    const errorBoundary = screen.getByTestId('error-boundary');
    expect(errorBoundary).toBeInTheDocument();

    expect(screen.getByTestId('main-page')).toBeInTheDocument();
    expect(screen.getByText('Main Page Content')).toBeInTheDocument();
  });
});
