import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toggleTheme } from '../store/slices/themeSlice';

const useTheme = () => {

  const { theme } = useSelector((state) => state.themeReducer);

  useEffect(() => {
    if (!theme) return;

    localStorage.setItem('theme', theme);

    theme === 'dark'
      ? document.body.classList.add('dark')
      : document.body.classList.remove('dark');

  }, [theme]);

  return { theme, toggleTheme };
};

export default useTheme;