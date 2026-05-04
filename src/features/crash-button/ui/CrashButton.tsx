import { Component } from 'react';
import { Button } from '@/shared/ui';

interface State {
  shouldCrash: boolean;
}

export class CrashButton extends Component<object, State> {
  state = { shouldCrash: false };

  handleCrash = () => {
    this.setState({ shouldCrash: true });
  };

  render() {
    if (this.state.shouldCrash) {
      throw new Error('Error Boundary works (test)');
    }

    return <Button onClick={this.handleCrash}>Error Boundary</Button>;
  }
}
