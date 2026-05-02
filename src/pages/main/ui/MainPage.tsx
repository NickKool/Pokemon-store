import { Component, type ReactNode } from 'react';

import { SearchBar } from '@/widgets/search-bar';
import { PokemonList } from '@/widgets/pokemon-list';

import { MOCK_POKEMONS } from './Moke-Pokemons';

export class MainPage extends Component {
  render(): ReactNode {
    return (
      <main className="w-full max-w-7xl mx-auto min-h-screen flex flex-col ">
        <div className=" p-8  flex flex-col items-center gap-6">
          <img src="/logo.png" alt="Logo" className="w-48 h-auto object-contain " />
          <div className="bg-search-bg w-full rounded-md p-3">
            <SearchBar />
          </div>
          <div className="bg-search-bg  w-full rounded-md p-3">
            <PokemonList pokemons={MOCK_POKEMONS} />
          </div>
        </div>
      </main>
    );
  }
}
