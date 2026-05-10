import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner component', () => {
  it('should render correctly', () => {
    render(<Spinner />);
    const spinner = screen.getByTestId('loader');
    expect(spinner).toBeInTheDocument();
  });

  it('should have animation and border classes', () => {
    render(<Spinner />);
    const spinner = screen.getByTestId('loader');
    expect(spinner).toHaveClass('animate-spin');
    expect(spinner).toHaveClass('rounded-full');
    expect(spinner).toHaveClass('border-t-transparent');
  });
});
