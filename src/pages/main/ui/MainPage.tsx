import { useEffect } from 'react';
import { useSearchParams, Outlet, useNavigate, useParams } from 'react-router-dom';
import { SearchBar } from '@/widgets/search-bar';
import { PokemonList } from '@/widgets/pokemon-list';
import { Pagination } from '@/shared/ui/pagination';
import { usePokemonsQuery } from '@/entities/pokemon';

const ITEMS_PER_PAGE = 20;

export function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const params = useParams();

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const isDetailOpen = !!params.id || !!searchParams.get('details');
  const currentSearchTerm = searchParams.get('q') || '';

  const savedTermInStorage = localStorage.getItem('pokemonSearchTerm') || '';

  const { data, isLoading, isError, error } = usePokemonsQuery(
    currentSearchTerm,
    currentPage,
    ITEMS_PER_PAGE
  );

  const isFullyOffline = !navigator.onLine;
  let errorMsg: string | null = null;

  if (isError || isFullyOffline) {
    if (isFullyOffline) {
      errorMsg = 'No internet connection. Cannot display or refresh data.';
    } else {
      errorMsg = error instanceof Error ? error.message : 'Unknown error';
    }
  }
  const pokemons = isFullyOffline ? [] : data?.pokemons || [];
  const totalCount = isFullyOffline ? 0 : data?.totalCount || 0;

  useEffect(() => {
    const urlQuery = searchParams.get('q');

    if (urlQuery === null && savedTermInStorage.trim() !== '') {
      const timer = setTimeout(() => {
        const currentParams = Object.fromEntries(searchParams.entries());
        setSearchParams({
          ...currentParams,
          q: savedTermInStorage,
          page: '1',
        });
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [searchParams, setSearchParams, savedTermInStorage]);

  const handleSearch = (term: string) => {
    setSearchParams({
      q: term,
      page: '1',
    });
  };

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    const currentQuery = searchParams.get('q');
    const newParams: Record<string, string> = { page: String(newPage) };

    if (currentQuery) {
      newParams.q = currentQuery;
    }

    setSearchParams(newParams);
    navigate({
      pathname: '.',
      search: new URLSearchParams(newParams).toString(),
    });
  };

  const handleCloseDetail = () => {
    const currentParams = Object.fromEntries(searchParams.entries());
    delete currentParams.details;

    navigate({
      pathname: '.',
      search: new URLSearchParams(currentParams).toString(),
    });
  };

  return (
    <main className="w-full max-w-7xl mx-auto min-h-screen flex flex-col p-4 sm:p-8">
      <div className="bg-search-bg w-full rounded-md p-3 mb-6">
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start grow relative">
        <div
          className={`transition-all duration-300 w-full ${isDetailOpen ? 'lg:w-1/2' : 'lg:w-full'}`}
        >
          <div className="bg-search-bg w-full rounded-md p-3 min-h-75">
            <PokemonList pokemons={pokemons} isLoading={isLoading} error={errorMsg} />

            {!isLoading && !error && pokemons.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>

        {isDetailOpen && (
          <div className="w-full lg:w-1/2 bg-search-bg border border-input-border rounded-md p-4 relative min-h-75 shadow-xl transition-colors duration-200">
            <button
              onClick={handleCloseDetail}
              className="group absolute top-3 right-3 bg-input-bg border border-input-border w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer"
            >
              <div className="relative w-3 h-3">
                <span className="absolute inset-0 m-auto h-0.5 w-full bg-sub-text group-hover:bg-main-text rotate-45 transition-colors" />
                <span className="absolute inset-0 m-auto h-0.5 w-full bg-sub-text group-hover:bg-main-text -rotate-45 transition-colors" />
              </div>
            </button>
            <Outlet context={{ handleCloseDetail }} />
          </div>
        )}
      </div>

      <div className="mt-4 self-center"></div>
    </main>
  );
}
