import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from './useAppStore';

describe('useAppStore (Client-side UI Selection)', () => {
  beforeEach(() => {
    useAppStore.setState({
      selectedIds: [],
    });
  });

  it('should have correct initial state', () => {
    const state = useAppStore.getState();
    expect(state.selectedIds).toEqual([]);
  });

  it('should add item ID to selectedIds if it is not present via toggleSelectItem', () => {
    const pokemonId = 25;

    useAppStore.getState().toggleSelectItem(pokemonId);

    const stateAfterAdd = useAppStore.getState();
    expect(stateAfterAdd.selectedIds).toEqual([pokemonId]);
  });

  it('should remove item ID from selectedIds if it is already present via toggleSelectItem', () => {
    const pokemonId = 25;

    useAppStore.setState({ selectedIds: [pokemonId, 1] });

    useAppStore.getState().toggleSelectItem(pokemonId);

    const stateAfterRemove = useAppStore.getState();
    expect(stateAfterRemove.selectedIds).toEqual([1]);
  });

  it('should support both number and string types for selectedIds in toggleSelectItem', () => {
    useAppStore.getState().toggleSelectItem(25);
    useAppStore.getState().toggleSelectItem('custom-id-1');

    const state = useAppStore.getState();
    expect(state.selectedIds).toEqual([25, 'custom-id-1']);
  });

  it('should clear all selected IDs via clearSelection', () => {
    useAppStore.setState({ selectedIds: [25, 1, 'pokemon-id'] });

    useAppStore.getState().clearSelection();

    const stateAfterClear = useAppStore.getState();
    expect(stateAfterClear.selectedIds).toEqual([]);
  });
});
