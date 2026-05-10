import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button component', () => {
  it('should display text correctly (children)', () => {
    render(<Button>Find</Button>);
    const buttonElement = screen.getByText(/find/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it('should the disabled attribute if isLoading={true}', () => {
    render(<Button isLoading={true}>Find</Button>);
    const buttonElement = screen.getByRole('button',{name:/find/i});
    expect(buttonElement).toBeDisabled();
  });

  it('should not be disabled if isLoading={false}', () => {
    render(<Button isLoading={false}>Find</Button>);
    const buttonElement = screen.getByRole('button',{name:/find/i});
    expect(buttonElement).not.toBeDisabled();
  });

  it('should combine base styles with an additional className', () => {
    const customClass = 'extra-margin';
    render(<Button className={customClass}>Find</Button>);
    const buttonElement = screen.getByRole('button',{name:/find/i});
    expect(buttonElement).toHaveClass(customClass);
    expect(buttonElement).toHaveClass('bg-btn-bg');
  });

  it('should pass standard attributes such as type', () => {
    render(<Button type="submit">Find</Button>);
    const buttonElement = screen.getByRole('button',{name:/find/i});
    expect(buttonElement).toHaveAttribute('type', 'submit');
  });
});
