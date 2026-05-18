import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@/widgets/layout';
import { MainPage } from '@/pages/main';
import { AboutPage } from '@/pages/about';
import { NotFoundPage } from '@/pages/not-found';

export const appRouter = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      errorElement: <NotFoundPage />,
      children: [
        {
          path: '',
          element: <MainPage />,
          children: [
            {
              path: 'pokemon/:id',
              element: <div className="text-white p-4">Pokemon Panel</div>,
            },
          ],
        },
        {
          path: 'about',
          element: <AboutPage />,
        },
        {
          path: '*',
          element: <NotFoundPage />,
        },
      ],
    },
  ],
  {
    basename: '/React-2026-Q2',
  }
);
