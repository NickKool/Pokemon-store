import { Component, type ChangeEvent } from 'react';
import { Button, Input } from '@/shared/ui';
import { getSavedSearchTerm, saveSearchTerm, isSameSearch } from '@/features/search-pokemon';

interface SearchBarProps {
  onSearch: (term: string) => void;
  isLoading: boolean;
}

interface State {
  searchTerm: string;
}

export class SearchBar extends Component<SearchBarProps, State> {
  state: State = {
    searchTerm: getSavedSearchTerm(),
  };

  onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value });
  };

  onSearchClick = () => {
    const { searchTerm } = this.state;
    const trimmed = searchTerm.trim();

    if (isSameSearch(trimmed)) return;

    saveSearchTerm(trimmed);

    this.props.onSearch(trimmed);
  };

  render() {
    const { searchTerm } = this.state;
    const { isLoading } = this.props;

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
