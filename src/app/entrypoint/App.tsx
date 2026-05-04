import { Component, type ReactNode } from 'react';
import '@/app/styles/index.css';

import { ErrorBoundary } from '../providers/ErrorBoundary/ErrorBoundary';
import { MainPage } from '@/pages/main/index';

export class App extends Component {
  render(): ReactNode {
    return (
      <ErrorBoundary>
        <MainPage />
      </ErrorBoundary>
    );
  }
}
