import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePokemonDetailsQuery } from '@/entities/pokemon';
import { Spinner } from '@/shared/ui';

export function PokemonDetail() {
  const { id } = useParams<{ id: string }>();
  const [isReady, setIsReady] = useState(false);

  const {
    data: pokemon,
    isLoading,
    isError,
    error,
  } = usePokemonDetailsQuery(isReady ? id : undefined);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  if (!isReady) return null;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Spinner />
      </div>
    );
  }

  if (isError || !pokemon) {
    const errorMsg = error instanceof Error ? error.message : 'Loading error';
    return <div className="text-red-500 p-4 text-center">{errorMsg}</div>;
  }

  return (
    <div className="flex flex-col items-center p-4 text-main-text">
      <img src={pokemon.image} alt={pokemon.name} className="w-48 h-48 object-contain mb-4" />
      <h2 className="text-2xl font-bold capitalize mb-2">{pokemon.name}</h2>
      <p className="text-sub-text text-sm text-center">
        <span className="font-bold text-main-text">Capabilities:</span> {pokemon.description}
      </p>
    </div>
  );
}
