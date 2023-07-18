import Text from 'components/common/Text';
import { useEffect, useRef } from 'react';

const heightUp = (node, maxHeight) => {
  let height = 0;

  const increment = () => {
    if (height < maxHeight) {
      height += 10;
      node.style.height = `${height}px`;
      setTimeout(increment, 10);
    }
  };
  increment();
};

const heightDown = (node, maxHeight) => {
  const decrement = () => {
    if (maxHeight > 0) {
      maxHeight -= 10;
      node.style.height = `${maxHeight}px`;
      setTimeout(decrement, 10);
    }
  };
  decrement();
};

const AccItemBody = ({ parentClassName, list, isOpen }) => {
  const itemBodyRef = useRef(null);

  const className = parentClassName
    ? `${parentClassName}__body-list`
    : 'body-list';

  const childClassName = parentClassName
    ? `${parentClassName}__body-item`
    : 'body-item';

  useEffect(() => {
    if (!itemBodyRef.current) return;

    const itemBody = itemBodyRef.current;
    const itemBodyHeight = itemBody.scrollHeight;

    if (isOpen) heightUp(itemBody, itemBodyHeight);
    if (!isOpen) heightDown(itemBody, itemBodyHeight);
  }, [isOpen]);

  return (
    <ul
      className={className}
      ref={itemBodyRef}
    >
      {list.map((item, index) => (
        <li
          key={index}
          className={childClassName}
        >
          <Text key={index}>
            <span>-</span>
            <span>{item}</span>
          </Text>
        </li>
      ))}
    </ul>
  );
};

export default AccItemBody;