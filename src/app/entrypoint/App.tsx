import { RouterProvider } from 'react-router-dom';
import { appRouter } from '../providers/router/appRouter';
import { ErrorBoundary } from '../providers/ErrorBoundary/ErrorBoundary';
import '@/app/styles/index.css';
import { ThemeProvider } from '@/shared/model';
import { QueryProvider } from '../providers/QueryProvider/QueryProvider';

export function App() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <ErrorBoundary>
          <RouterProvider router={appRouter} />
        </ErrorBoundary>
      </ThemeProvider>
    </QueryProvider>
  );
}
