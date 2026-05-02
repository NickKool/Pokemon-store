import { Component, type ChangeEvent } from 'react';
import { Button, Input } from '@/shared/ui';

interface State {
  searchTerm: string;
  isLoading: boolean;
}

export class SearchBar extends Component<object, State> {
  constructor(props: object) {
    super(props);

    const savedSearch = localStorage.getItem('pokemonSearchTerm') || '';

    this.state = {
      searchTerm: savedSearch,
      isLoading: false,
    };
  }

  onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value });
  };

  onSearchClick = () => {
    const { searchTerm } = this.state;
    const trimmedTerm = searchTerm.trim();

    const lastSaved = localStorage.getItem('pokemonSearchTerm');
    if (trimmedTerm === lastSaved) return;

    localStorage.setItem('pokemonSearchTerm', trimmedTerm);
  };

  render() {
    const { searchTerm, isLoading } = this.state;

    const isInputEmpty = !searchTerm.trim();

    return (
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl mx-auto">
        <Input
          type="text"
          value={searchTerm}
          onChange={this.onInputChange}
          placeholder="Pokemon name..."
          className="grow"
          disabled={isLoading}
        />
        <Button
          onClick={this.onSearchClick}
          className="whitespace-nowrap"
          disabled={isInputEmpty}
          isLoading={isLoading}
        >
          Find
        </Button>
      </div>
    );
  }
}
