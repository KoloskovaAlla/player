import { memo } from 'react';
import { Link } from 'react-router-dom';

const MenuItem = memo(({
  parentClassName,
  menuItem,
  onMenuItemClick
}) => {

  const { target, url, pagename } = menuItem;

  return (
    <li className={`${parentClassName}__item`}>
      {target && (
        <Link
          onClick={onMenuItemClick}
          to={`/${pagename}`}
        >
          {menuItem.text}
        </Link>
      )}

      {url && (
        <a
          href={url}
          target='_blank'
          rel='noreferrer'
        >
          {menuItem.text}
        </a>
      )}
    </li>
  );
});

export default MenuItem;