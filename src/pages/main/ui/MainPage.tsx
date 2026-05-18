import { Component, type ReactNode } from 'react';
import { SearchBar } from '@/widgets/search-bar';
import { PokemonList } from '@/widgets/pokemon-list';
import { searchService } from '@/features/search-pokemon';
import type { PokemonData } from '@/features/search-pokemon';

interface State {
  pokemons: PokemonData[];
  isLoading: boolean;
  error: string | null;
}

export class MainPage extends Component<object, State> {
  state: State = {
    pokemons: [],
    isLoading: false,
    error: null,
  };

  async componentDidMount() {
    this.runSearch();
  }

  runSearch = async (term?: string) => {
    this.setState({ isLoading: true, error: null });
    try {
      const data: PokemonData[] = await searchService.execute(term);
      this.setState({ pokemons: data });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      this.setState({ error: msg, pokemons: [] });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render(): ReactNode {
    const { pokemons, isLoading, error } = this.state;

    return (
      <main className="w-full max-w-7xl mx-auto min-h-screen flex flex-col">
        <div className="p-8 flex flex-col items-center gap-6">
          <div className="bg-search-bg w-full rounded-md p-3">
            <SearchBar onSearch={this.runSearch} isLoading={isLoading} />
          </div>

          <div className="bg-search-bg w-full rounded-md p-3 relative min-h-75">
            <PokemonList pokemons={pokemons} isLoading={isLoading} error={error} />
          </div>
        </div>
      </main>
    );
  }
}
