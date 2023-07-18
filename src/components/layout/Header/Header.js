import { memo, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { scrollToTop, debounce } from 'utils/helpers';
import Navigation from './components/Navigation';
import Theme from './components/Theme';
import Burger from './components/Burger';
import clsx from 'clsx';
import Socials from './components/Socials';
import { useHeader } from 'hooks';

export const Header = memo(() => {
  const {
    fetchHeaderData,
    headerData,
  } = useHeader();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHeaderData());
  }, [dispatch, fetchHeaderData]);

  const { theme } = useSelector((state) => state.themeReducer);
  const [isBurgerActive, setIsBurgerActive] = useState(false);

  const className = 'header';
  const headerClassNames = clsx(className, { 'dark': theme === 'dark' });

  useEffect(() => {
    const handleWindowResize = () => setIsBurgerActive(false);
    const debouncedHandleWindowResize = debounce(handleWindowResize, 500);
    window.addEventListener('resize', debouncedHandleWindowResize);
    return () => window.removeEventListener('resize', debouncedHandleWindowResize);
  }, []);

  const handleLogoClick = useCallback(() => {
    setIsBurgerActive(false);
    scrollToTop();
  }, []);

  const handleMenuItemClick = useCallback((event) => {
    setIsBurgerActive(false);
  }, []);

  const handleBurgerClick = useCallback(() => {
    setIsBurgerActive((prevValue) => !prevValue);
  }, []);

  if (headerData) return (
    <header className={headerClassNames} id={headerData.name}>
      <div className={`${className}__wrapper`}>
        <Navigation
          parentClassName={className}
          onLogoClick={handleLogoClick}
          isMenuActive={isBurgerActive}
          menuItems={headerData.menuItems}
          onMenuItemClick={handleMenuItemClick}
        />

        <Socials
          parentClassName={className}
          socials={headerData.socials}
        />

        <Theme parentClassName={className} />

        <Burger
          parentClassName={className}
          isBurgerActive={isBurgerActive}
          onBurgerClick={handleBurgerClick}
        />
      </div>
    </header>
  );
  else return null;
});
