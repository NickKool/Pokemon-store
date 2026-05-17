import { Component } from 'react';
import { PokemonCard } from '@/entities/pokemon';
import { Spinner } from '@/shared/ui';
import type { PokemonData } from '@/features/search-pokemon';

export interface PokemonListProps {
  pokemons: PokemonData[];
  isLoading: boolean;
  error: string | null;
}

export class PokemonList extends Component<PokemonListProps> {
  render() {
    const { pokemons, isLoading, error } = this.props;

    if (isLoading) {
      return (
        <div className="flex justify-center items-center min-h-75">
          <Spinner />
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-red-500 text-center mt-10 p-6 border border-red-500/20 bg-red-500/5 rounded-xl">
          <p className="font-bold text-lg mb-1">Loading error</p>
          <p>{error}</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            description={pokemon.description}
            imageUrl={pokemon.image}
          />
        ))}
      </div>
    );
  }
}
