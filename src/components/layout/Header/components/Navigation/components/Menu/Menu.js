import { useSelector } from 'react-redux';
import MenuItem from './components/MenuItem';
import clsx from 'clsx';

const Menu = ({
  parentClassName,
  menuItems,
  isMenuActive,
  onMenuItemClick
}) => {

  const { theme } = useSelector((state) => state.themeReducer);

  const menuClassName = parentClassName
    ? `${parentClassName}__menu`
    : 'menu';

  const menuClassNames = clsx(menuClassName, {
    'active': isMenuActive,
    'dark': theme === 'dark'
  });

  return (
    <ul className={menuClassNames}>
      {menuItems?.length > 0 && menuItems.map((menuItem, index) => (
        <MenuItem
          parentClassName={parentClassName}
          key={index}
          menuItem={menuItem}
          onMenuItemClick={onMenuItemClick}
        />
      ))}
    </ul>
  );
};

export default Menu;