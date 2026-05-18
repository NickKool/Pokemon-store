import { Outlet, NavLink } from 'react-router-dom';

export function Layout() {
  return (
    <>
      <header className="w-full max-w-7xl mx-auto px-8 py-4 flex justify-between items-center border-b border-gray-700">
        <NavLink to="/" className="hover:opacity-80 transition-opacity duration-200">
          <img src="/React-2026-Q2/logo.png" alt="Logo" className="w-32 h-auto object-contain" />
        </NavLink>
        <nav className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'text-yellow-400 font-semibold border-b-2 border-yellow-400 pb-1'
                : 'text-gray-300 hover:text-white transition'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? 'text-yellow-400 font-semibold border-b-2 border-yellow-400 pb-1'
                : 'text-gray-300 hover:text-white transition'
            }
          >
            About Us
          </NavLink>
        </nav>
      </header>

      <Outlet />
    </>
  );
}
