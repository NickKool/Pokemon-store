import { Component, type InputHTMLAttributes, type ReactNode } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export class Input extends Component<InputProps> {
  render(): ReactNode {
    const { className, ...props } = this.props;
    return (
      <input
        {...props}
        className={`
          w-full px-4 py-2 rounded-lg outline-none transition-all border

          bg-input-bg border-input-border text-input-text placeholder:text-input-placeholder

          focus:border-input-focus focus:ring-1 focus:ring-input-focus
          ${className || ''}
        `}
      />
    );
  }
}
