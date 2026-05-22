import { useAppStore } from '@/shared/model';
import { downloadCsv } from '@/shared/lib';

export function SelectionPanel() {
  const selectedIds = useAppStore((state) => state.selectedIds);
  const clearSelection = useAppStore((state) => state.clearSelection);
  const pokemons = useAppStore((state) => state.pokemons);

  const selectedCount = selectedIds.length;

  if (selectedCount === 0) return null;

  const handleDownload = () => {
    const selectedPokemons = pokemons.filter((pokemon) => {
      return selectedIds.some(
        (selectedId) => String(selectedId).trim() === String(pokemon.id).trim()
      );
    });
    downloadCsv(selectedPokemons);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-search-bg border-t border-input-border p-4 transition-all duration-300">
      <div className="w-full max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-main-text font-bold text-lg tracking-wide">
          Selected items: <span className="text-input-focus">{selectedCount}</span>
        </div>

        <div className="flex gap-4 w-full sm:w-auto">
          <button
            onClick={clearSelection}
            className="flex-1 sm:flex-none px-5 py-2 bg-btn-bg text-main-text hover:bg-btn-hover text-sm font-bold rounded-lg transition-all cursor-pointer "
          >
            Unselect All
          </button>

          <button
            onClick={handleDownload}
            className="flex-1 sm:flex-none px-5 py-2 bg-input-focus text-input-bg hover:opacity-90 text-sm font-bold rounded-lg transition-all cursor-pointer "
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
