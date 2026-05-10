import { render, screen } from '@testing-library/react';
import { PokemonCard } from './PokemonCard';

describe('PokemonCard', () => {
  const mockData = {
    name: 'Pikachu',
    description: 'Mouse Pokemon',
    imageUrl: 'https://githubusercontent.com/',
  };

  it('should correctly display the name, description and image', () => {
    render(
      <PokemonCard
        name={mockData.name}
        description={mockData.description}
        imageUrl={mockData.imageUrl}
      />
    );

    expect(screen.getByText(mockData.name)).toBeInTheDocument();
    expect(screen.getByText(mockData.description)).toBeInTheDocument();

    const image = screen.getByAltText(mockData.name) as HTMLImageElement;

    expect(image).toBeInTheDocument();
    expect(image.src).toBe(mockData.imageUrl);
  });

  it('should img the correct CSS class for styling', () => {
    render(<PokemonCard {...mockData} />);

    const image = screen.getByAltText(mockData.name);
    expect(image).toHaveClass('object-contain');
  });
});
