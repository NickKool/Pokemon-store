import { type InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
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
