import { Link, useSearchParams } from 'react-router-dom';
import { useAppStore } from '@/shared/model';

interface PokemonCardProps {
  id: string | number;
  name: string;
  description: string;
  imageUrl: string;
}

export function PokemonCard({ id, name, description, imageUrl }: PokemonCardProps) {
  const [searchParams] = useSearchParams();

  const selectedIds = useAppStore((state) => state.selectedIds);
  const toggleSelectItem = useAppStore((state) => state.toggleSelectItem);

  const isSelected = selectedIds.includes(id);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    toggleSelectItem(id);
  };

  return (
    <Link
      to={{
        pathname: `pokemon/${id}`,
        search: searchParams.toString(),
      }}
      className={`bg-search-bg border rounded-xl p-4 flex flex-col items-center relative
                 transition-all hover:scale-105 shadow-md cursor-pointer text-none w-full box-border
                 ${isSelected ? 'border-input-focus ring-2 ring-input-focus' : 'border-input-border'}`}
    >
      <div className="absolute top-3 left-3 z-10">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleCheckboxChange}
          onClick={(e) => e.stopPropagation()}
          className="w-4 h-4 cursor-pointer accent-input-focus"
        />
      </div>
      <div className="w-full max-w-32 aspect-square bg-input-bg border border-input-border rounded-full mb-4 flex items-center justify-center p-3">
        <img src={imageUrl} alt={name} className="w-full h-full object-contain max-h-24" />
      </div>

      <h3 className="text-main-text font-bold text-xl capitalize mb-2 font-sans text-center truncate w-full">
        {name}
      </h3>

      <p className="text-sub-text text-sm text-center line-clamp-2 w-full">{description}</p>
    </Link>
  );
}
