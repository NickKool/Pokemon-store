import { Outlet, NavLink } from 'react-router-dom';
import { useAppTheme } from '@/shared/model';

export function Layout() {
  const { theme, toggleTheme } = useAppTheme();

  return (
    <>
      <header className="w-full max-w-7xl mx-auto px-8 py-4 flex justify-between items-center border-b border-input-border">
        <NavLink to="/" className="hover:opacity-80 transition-opacity duration-200">
          <img src="/React-2026-Q2/logo.png" alt="Logo" className="w-32 h-auto object-contain" />
        </NavLink>

        <nav className="flex gap-6 items-center">
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
        <button
          onClick={toggleTheme}
          className="px-4 py-1.5 text-sm font-semibold rounded-md border border-input-border transition-all cursor-pointer active:scale-95 bg-search-bg text-main-text hover:opacity-80"
        >
          {theme === 'light' ? 'Dark' : 'Light'}
        </button>
      </header>

      <Outlet />
    </>
  );
}
