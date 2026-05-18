import React, { useState, type ChangeEvent } from 'react';
import { Button, Input } from '@/shared/ui';
import { useLocalStorage } from '@/shared/lib';

interface SearchBarProps {
  onSearch: (term: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [savedSearch, setSavedSearch] = useLocalStorage('pokemonSearchTerm', '');

  const [searchTerm, setSearchTerm] = useState(savedSearch);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onSearchClick = () => {
    const trimmed = searchTerm.trim();

    setSearchTerm(trimmed);
    setSavedSearch(trimmed);
    onSearch(trimmed);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl mx-auto">
      <Input
        type="text"
        value={searchTerm}
        onChange={onInputChange}
        placeholder="Pokemon name..."
        className="grow"
      />
      <Button onClick={onSearchClick} className="whitespace-nowrap" isLoading={isLoading}>
        Find
      </Button>
    </div>
  );
};
