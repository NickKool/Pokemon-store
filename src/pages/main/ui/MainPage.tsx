import { Component, type ReactNode } from 'react';

export class MainPage extends Component {
  render(): ReactNode {
    return (
      <main className="w-full max-w-7xl mx-auto min-h-screen flex flex-col ">
        <div className=" p-8  flex flex-col items-center gap-6">
          <img src="/logo.png" alt="Logo" className="w-48 h-auto object-contain " />
          <div className="bg-search-bg w-full rounded-md p-3">екпкерке</div>
          <div className="bg-search-bg text-sub-text w-full rounded-md p-3">ergergerg</div>
        </div>
      </main>
    );
  }
}
