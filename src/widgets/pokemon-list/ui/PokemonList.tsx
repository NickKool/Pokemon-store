import { PokemonCard } from '@/entities/pokemon';
import type { PokemonData } from '@/features/search-pokemon';

export interface PokemonListProps {
  pokemons: PokemonData[];
}

export function PokemonList({ pokemons }: PokemonListProps) {
  if (pokemons.length === 0) return null;

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
