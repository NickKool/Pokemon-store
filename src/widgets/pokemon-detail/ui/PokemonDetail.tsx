import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PokemonApi } from '@/entities/pokemon';
import { Spinner } from '@/shared/ui';

interface DetailData {
  name: string;
  image: string;
  abilities: string;
}

const DETAILED_PANEL_DELAY = 1500;
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function PokemonDetail() {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<DetailData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!id || !isReady) return;

    let isMounted = true;

    const fetchPokemonData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await PokemonApi.getByName(id);
        const data = Array.isArray(response.results) ? response.results[0] : response.results;

        if (!data) throw new Error('Pokemon not found');

        await sleep(DETAILED_PANEL_DELAY);

        if (isMounted) {
          setPokemon({
            name: data.name,
            image:
              data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
            abilities: data.abilities
              .map((a: { ability: { name: string } }) => a.ability.name)
              .join(', '),
          });
        }
      } catch (err) {
        if (isMounted) {
          if (id) {
            const msg = err instanceof Error ? err.message : 'Loading error';
            setError(msg);
            setPokemon(null);
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchPokemonData();

    return () => {
      isMounted = false;
    };
  }, [id, isReady]);

  if (!isReady) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Spinner />
      </div>
    );
  }

  if (error || !pokemon) {
    return <div className="text-red-500 p-4 text-center">{error || 'Loading error'}</div>;
  }

  return (
    <div className="flex flex-col items-center p-4 text-white">
      <img src={pokemon.image} alt={pokemon.name} className="w-48 h-48 object-contain mb-4" />
      <h2 className="text-2xl font-bold capitalize mb-2">{pokemon.name}</h2>
      <p className="text-sub-text text-sm text-center">
        <span className="font-bold text-main-text">Capabilities:</span> {pokemon.abilities}
      </p>
    </div>
  );
}
