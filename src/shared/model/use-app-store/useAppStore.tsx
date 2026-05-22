import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface PokemonData {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface AppState {
  pokemons: PokemonData[];
  setPokemons: (pokemons: PokemonData[]) => void;
  selectedIds: (string | number)[];
  toggleSelectItem: (id: string | number) => void;
  clearSelection: () => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      pokemons: [],
      setPokemons: (pokemons) => set({ pokemons }, false, 'pokemons/set'),

      selectedIds: [],
      toggleSelectItem: (id) =>
        set(
          (state) => {
            const isAlreadySelected = state.selectedIds.includes(id);
            const newSelectedIds = isAlreadySelected
              ? state.selectedIds.filter((itemId) => itemId !== id)
              : [...state.selectedIds, id];

            return { selectedIds: newSelectedIds };
          },
          false,
          'items/toggleSelect'
        ),
      clearSelection: () => set({ selectedIds: [] }, false, 'items/clearSelection'),
    }),
    { name: 'AppStore' }
  )
);
