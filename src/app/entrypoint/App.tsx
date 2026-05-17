import { RouterProvider } from 'react-router-dom';
import { appRouter } from '../providers/router/appRouter';
import { ErrorBoundary } from '../providers/ErrorBoundary/ErrorBoundary';
import '@/app/styles/index.css';

export function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={appRouter} />
    </ErrorBoundary>
  );
}
