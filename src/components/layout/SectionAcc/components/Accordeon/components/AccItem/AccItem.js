import { useState } from 'react';
import AccItemHeader from './components/AccItemHeader';
import AccItemBody from './components/AccItemBody';

const AccItem = ({ parentClassName, item }) => {

  const { title, list } = item;
  const [isOpen, setIsOpen] = useState(false);

  const className = parentClassName
    ? `${parentClassName}__item`
    : 'item';

  const btnClassName = parentClassName
    ? `${parentClassName}__btn`
    : 'btn';

  const handleItemClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className={className}>
      <button
        className={btnClassName}
        type='button'
        onClick={handleItemClick}
      >
        <AccItemHeader
          parentClassName={parentClassName}
          title={title}
          isOpen={isOpen}
        />

        <AccItemBody
          parentClassName={parentClassName}
          list={list}
          isOpen={isOpen}
        />
      </button>
    </li>
  );
};

export default AccItem;