import { useRef } from 'react';
import { useAnimateRef } from 'hooks';
import { ReactComponent as CheckIcon } from './assets/check.svg';

const ListItem = ({ parentClassName, children }) => {
  const listItemRef = useRef(null);
  useAnimateRef(listItemRef);

  const className = parentClassName
    ? `${parentClassName}__item`
    : 'item';

  if (!children) return null;

  return (
    <li
      ref={listItemRef}
      className={className}
    >
      <span className='icon'>{<CheckIcon />}</span>
      <span className='text'>{children}</span>
    </li>
  );
};

export default ListItem;