import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AppState {
  selectedIds: (string | number)[];
  toggleSelectItem: (id: string | number) => void;
  clearSelection: () => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
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
