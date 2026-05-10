import { Component } from 'react';

export class Spinner extends Component {
  render() {
    return (
      <div
        data-testid="loader"
        className="w-20 h-20 border-2 border-input-focus border-t-transparent rounded-full animate-spin"
      />
    );
  }
}
