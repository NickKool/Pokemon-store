import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';

describe('Input component', () => {
  it('should render correctly in document', () => {
    render(<Input placeholder="Pokemon name..." />);
    const inputElement = screen.getByPlaceholderText(/pokemon name.../i);
    expect(inputElement).toBeInTheDocument();
  });

  it('should call onChange when user types text', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'pikachu' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('should render input value', () => {
    render(<Input value="charizard" readOnly />);
    const inputElement = screen.getByDisplayValue('charizard');
    expect(inputElement).toBeInTheDocument();
  });

  it('should add custom class at basic class', () => {
    const customClass = 'test';
    render(<Input className={customClass} />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveClass('bg-input-bg');
    expect(inputElement).toHaveClass(customClass);
  });
});
