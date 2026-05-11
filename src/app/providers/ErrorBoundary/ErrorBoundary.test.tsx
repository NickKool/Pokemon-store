import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';

const ThrowError = () => {
  throw new Error('Test Error');
};

describe('ErrorBoundary', () => {
  const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

  beforeEach(() => {
    consoleSpy.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render a placeholder when an error occurs', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Error Boundary!')).toBeInTheDocument();
    expect(
      screen.getByText(/The application has successfully passed the test/i)
    ).toBeInTheDocument();
  });

  it('should render children if there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Safe Content</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Safe Content')).toBeInTheDocument();
    expect(screen.queryByText('Error Boundary!')).not.toBeInTheDocument();
  });

  it('should reload the page when the button is clicked', () => {
    const reloadMock = vi.fn();
    vi.stubGlobal('location', { ...window.location, reload: reloadMock });
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    const button = screen.getByRole('button', { name: /Refresh Page/i });
    fireEvent.click(button);
    expect(reloadMock).toHaveBeenCalled();
  });
});
