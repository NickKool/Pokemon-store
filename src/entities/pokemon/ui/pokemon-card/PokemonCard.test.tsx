import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PokemonCard } from './PokemonCard';

describe('PokemonCard', () => {
  const mockData = {
    id: 25,
    name: 'Pikachu',
    description: 'Mouse Pokemon',
    imageUrl: 'https://githubusercontent.com/',
  };

  it('should correctly display the name, description and image', () => {
    render(
      <MemoryRouter>
        <PokemonCard
          id={mockData.id}
          name={mockData.name}
          description={mockData.description}
          imageUrl={mockData.imageUrl}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(mockData.name)).toBeInTheDocument();
    expect(screen.getByText(mockData.description)).toBeInTheDocument();

    const image = screen.getByAltText(mockData.name) as HTMLImageElement;

    expect(image).toBeInTheDocument();
    expect(image.src).toBe(mockData.imageUrl);
  });

  it('should apply the correct CSS class for styling', () => {
    render(
      <MemoryRouter>
        <PokemonCard {...mockData} />
      </MemoryRouter>
    );

    const image = screen.getByAltText(mockData.name);
    expect(image).toHaveClass('object-contain');
  });

  it('should generate correct link URL with current id', () => {
    render(
      <MemoryRouter initialEntries={['/?page=3']}>
        <PokemonCard {...mockData} />
      </MemoryRouter>
    );

    const cardLink = screen.getByRole('link');

    expect(cardLink).toHaveAttribute('href', '/pokemon/25?page=3');
  });
});
