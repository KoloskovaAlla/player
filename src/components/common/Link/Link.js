import { useRef } from 'react';
import { useAnimateRef } from 'hooks';

const Link = ({ parentClassName, url, children }) => {
  const linkRef = useRef(null);
  useAnimateRef(linkRef);

  if (!children) return null;

  const className = parentClassName
    ? `${parentClassName}__link`
    : 'link';

  return (
    <a
      className={className}
      ref={linkRef}
      href={url}
      target='_blank'
      rel="noreferrer"
    >
      {children}
    </a>
  );
};

export default Link;