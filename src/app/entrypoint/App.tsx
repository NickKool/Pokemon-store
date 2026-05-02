import { Component, type ReactNode } from 'react';
import '@/app/styles/index.css';

import { MainPage } from '@/pages/main/index';

export class App extends Component {
  render(): ReactNode {
    return (
      <div className=" flex flex-col items-center">
        <MainPage />
      </div>
    );
  }
}
