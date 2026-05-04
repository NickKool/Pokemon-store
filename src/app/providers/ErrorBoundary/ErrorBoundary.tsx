import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button } from '@/shared/ui';

interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white p-4">
          <h1 className="text-2xl font-bold text-red-500">Error Boundary!</h1>
          <p className="mt-2 text-slate-400">
            The application has successfully passed the test Error Boundary.
          </p>
          <Button className="mt-6 px-4 py-2" onClick={() => window.location.reload()}>
            Refresh Page
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
