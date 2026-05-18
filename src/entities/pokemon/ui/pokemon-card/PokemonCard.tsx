import { Link, useSearchParams } from 'react-router-dom';

interface PokemonCardProps {
  id: string | number;
  name: string;
  description: string;
  imageUrl: string;
}

export function PokemonCard({ id, name, description, imageUrl }: PokemonCardProps) {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{
        pathname: `pokemon/${id}`,
        search: searchParams.toString(),
      }}
      className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex flex-col items-center 
                 transition-transform hover:scale-105 shadow-md cursor-pointer text-none w-full box-border"
    >
      <div className="w-full max-w-32 aspect-square bg-slate-900 rounded-full mb-4 flex items-center justify-center p-3">
        <img src={imageUrl} alt={name} className="w-full h-full object-contain max-h-24" />
      </div>

      <h3 className="text-main-text font-bold text-xl capitalize mb-2 font-sans text-center truncate w-full">
        {name}
      </h3>

      <p className="text-sub-text text-sm text-center line-clamp-2 w-full">{description}</p>
    </Link>
  );
}
