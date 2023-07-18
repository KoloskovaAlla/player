import { useState, useEffect } from 'react';
import ThemeContext from '../contexts/ThemeContext';

export const ThemeProvider = ({ children }) => {

  const [theme, setTheme] = useState(() => (
    localStorage.getItem('theme') ?? 'light'
  ));

  useEffect(() => {
    localStorage.setItem('theme', theme);
    theme === 'dark'
      ? document.body.classList.add('dark')
      : document.body.classList.remove('dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (
      prevTheme === 'light' ? 'dark' : 'light'
    ));
  };

  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
