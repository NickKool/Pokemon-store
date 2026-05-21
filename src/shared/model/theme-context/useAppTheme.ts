import { useContext } from 'react';
import { ThemeContext } from './themeContext';
export function useAppTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useAppTheme should be used strictly internally ThemeProvider');
  }

  return context;
}
