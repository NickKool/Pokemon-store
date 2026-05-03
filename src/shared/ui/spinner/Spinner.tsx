import { Component } from 'react';

export class Spinner extends Component {
  render() {
    return (
      <div className="w-20 h-20 border-2 border-input-focus border-t-transparent rounded-full animate-spin" />
    );
  }
}
