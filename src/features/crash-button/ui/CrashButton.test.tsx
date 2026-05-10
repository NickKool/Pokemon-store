import { render, screen, fireEvent } from '@testing-library/react';
import { CrashButton } from './CrashButton';

describe('CrashButton Component', () => {
  it('should displaly correct wwithe text "Error Boundary"', () => {
    render(<CrashButton />);
    expect(screen.getByRole('button', { name: /error boundary/i })).toBeInTheDocument();
  });

  it('should throw an error when the button is clicked', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<CrashButton />);
    const button = screen.getByRole('button', { name: /error boundary/i });
    expect(() => {
      fireEvent.click(button);
    }).toThrow('Error Boundary works (test)');
    consoleSpy.mockRestore();
  });
});
