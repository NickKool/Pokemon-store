import { NavLink } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="text-center p-16 text-main-text flex flex-col items-center gap-4">
      <h1 className="text-6xl font-extrabold text-red-500">404</h1>
      <h2 className="text-2xl font-semibold">Page Not Found</h2>
      <p className="text-sub-text">The page you are looking for does not exist.</p>

      <NavLink
        to="/"
        className="mt-4 px-4 py-2 bg-search-bg border border-input-border rounded text-input-focus hover:opacity-80 transition cursor-pointer active:scale-95"
      >
        Return to Home
      </NavLink>
    </div>
  );
}
