import { Outlet, NavLink } from 'react-router-dom';
import { useAppTheme } from '@/shared/model';
import { SelectionPanel } from '@/widgets/selection-panel';
import { useRefreshPokemons } from '@/entities/pokemon';

export function Layout() {
  const { theme, toggleTheme } = useAppTheme();
  const refreshPokemons = useRefreshPokemons();

  return (
    <>
      <div className="w-full min-h-screen flex flex-col pb-20">
        <header className="w-full max-w-7xl mx-auto px-8 py-4 flex items-center justify-between border-b border-input-border relative">
          <div className="flex-shrink-0 ">
            <NavLink to="/" className="hover:opacity-80 transition-opacity duration-200">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-32 h-auto object-contain"
              />
            </NavLink>
          </div>

          <nav className="absolute left-1/2 -translate-x-1/2 flex gap-6 items-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'text-input-focus font-semibold border-b-2 border-input-focus pb-1'
                  : 'text-sub-text hover:text-main-text transition'
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? 'text-input-focus font-semibold border-b-2 border-input-focus pb-1'
                  : 'text-sub-text hover:text-main-text transition'
              }
            >
              About Us
            </NavLink>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="px-4 py-1.5 text-sm font-semibold rounded-md border border-input-border transition-all cursor-pointer active:scale-95 bg-search-bg text-main-text hover:opacity-80"
            >
              {theme === 'light' ? 'Dark' : 'Light'}
            </button>
            <button
              onClick={refreshPokemons}
              className="px-4 py-1.5 text-sm font-semibold rounded-md border border-input-border transition-all cursor-pointer active:scale-95 bg-search-bg text-main-text hover:opacity-80"
            >
              Refresh cache
            </button>
          </div>
        </header>

        <Outlet />
      </div>
      <SelectionPanel />
    </>
  );
}
