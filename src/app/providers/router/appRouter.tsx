import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@/widgets/layout';
import { MainPage } from '@/pages/main';
import { AboutPage } from '@/pages/about';
import { NotFoundPage } from '@/pages/not-found';
import { PokemonDetail } from '@/widgets/pokemon-detail';

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
              element: <PokemonDetail />,
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
    basename: '/',
  }
);
