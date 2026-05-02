import { Component, type ButtonHTMLAttributes, type ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
}

export class Button extends Component<ButtonProps> {
  render() {
    const { children, isLoading, disabled, className, ...props } = this.props;

    return (
      <button
        {...props}
        disabled={isLoading || disabled}
        className={`
          px-6 py-2 rounded-lg font-bold transition-all flex items-center justify-center

          cursor-pointer

          bg-btn-bg text-white hover:bg-btn-hover

          disabled:opacity-50 disabled:cursor-not-allowed
          ${className || ''}
        `}
      >
        {children}
      </button>
    );
  }
}
