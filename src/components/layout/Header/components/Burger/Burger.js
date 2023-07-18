import { memo } from 'react';
import clsx from 'clsx';

const Burger = memo(({
  parentClassName,
  isBurgerActive,
  onBurgerClick
}) => {

  const className = parentClassName
    ? `${parentClassName}__burger`
    : 'burger';

  const classNames = clsx(className, {
    'active': isBurgerActive
  });

  return (
    <button
      className={classNames}
      onClick={onBurgerClick}
    >
      <span></span>
    </button>
  );
});

export default Burger;