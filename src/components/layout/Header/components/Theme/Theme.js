import { memo } from 'react';
import { useDispatch } from 'react-redux';
import useTheme from '../../../../../hooks/useTheme';
import { ReactComponent as MoonIcon } from './assets/moon.svg';
import { ReactComponent as SunIcon } from './assets/sun.svg';

const Theme = memo(({ parentClassName }) => {

  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch();

  const handleThemeClick = () => {
    dispatch(toggleTheme());
  };

  const className = parentClassName
    ? `${parentClassName}__theme`
    : 'theme';

  return (
    <button
      className={className}
      onClick={handleThemeClick}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
});

export default Theme;