import { useSelector } from 'react-redux';
import clsx from 'clsx';
import Spiner from 'components/common/Spiner';

export const Preloader = () => {

  const { theme } = useSelector((state) => state.themeReducer);

  const classes = clsx({
    'preloader': true,
    'dark': theme === 'dark'
  });

  return (
    <div className={'preloader'}>
      <Spiner />
    </div>
  );
};
