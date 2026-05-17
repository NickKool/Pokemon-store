import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { App } from './App';

vi.mock('@/pages/main/index', () => ({
  MainPage: () => <div data-testid="main-page">Main Page Content</div>,
}));

vi.mock('@/pages/about/ui/AboutPage', () => ({
  AboutPage: () => <div data-testid="about-page">About Page Content </div>,
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

  it('should display image logo and navigate to About Us page on link click', async () => {
    const user = userEvent.setup();
    render(<App />);

    const logoImg = screen.getByRole('img', { name: /logo/i });
    expect(logoImg).toBeInTheDocument();

    const aboutLink = screen.getByRole('link', { name: /about us/i });
    await user.click(aboutLink);

    expect(screen.queryByTestId('main-page')).not.toBeInTheDocument();
    expect(screen.getByTestId('about-page')).toBeInTheDocument();
  });
});
