import { memo } from 'react';
import Logo from './components/Logo';
import Menu from './components/Menu';

const Navigation = memo(({
  parentClassName,
  onLogoClick,
  isMenuActive,
  menuItems,
  onMenuItemClick
}) => {

  return (
    <nav className={`${parentClassName}__nav`}>
      <Logo
        parentClassName={parentClassName}
        onLogoClick={onLogoClick}
      />

      <Menu
        parentClassName={parentClassName}
        isMenuActive={isMenuActive}
        menuItems={menuItems}
        onMenuItemClick={onMenuItemClick}
      />
    </nav>
  );
});

export default Navigation;