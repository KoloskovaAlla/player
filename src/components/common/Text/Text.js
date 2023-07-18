import { useRef } from 'react';
import { useAnimateRef } from 'hooks';

const Text = ({ parentClassName, className, children }) => {
  const textRef = useRef(null);
  useAnimateRef(textRef);

  if (!children) return null;

  const currentClassName = parentClassName
    ? `${parentClassName}__copy`
    : className;

  return (
    <p className={currentClassName} ref={textRef}>{children}</p>
  );
};

export default Text;