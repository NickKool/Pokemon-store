import { Component } from 'react';
import { PokemonCard } from '@/entities/pokemon';

interface PokemonData {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface PokemonListProps {
  pokemons: PokemonData[];
}

export class PokemonList extends Component<PokemonListProps> {
  render() {
    const { pokemons } = this.props;

    if (pokemons.length === 0) {
      return (
        <div className="text-sub-text text-center mt-10 italic">
          No Pokemons found. Try searching for one!
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            name={pokemon.name}
            description={pokemon.description}
            imageUrl={pokemon.image}
          />
        ))}
      </div>
    );
  }
}
