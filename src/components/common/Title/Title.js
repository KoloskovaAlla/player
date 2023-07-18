import { useRef } from 'react';
import { useAnimateRef } from 'hooks';

const Title = ({ parentClassName, className, priority, children }) => {
  const titleRef = useRef(null);
  useAnimateRef(titleRef);

  if (!children) return null;

  const currentClassName = parentClassName
    ? `${parentClassName}__title`
    : className;

  switch (priority) {
    default: return <h1 className={currentClassName} ref={titleRef}>{children}</h1>;
    case 2: return <h2 className={currentClassName} ref={titleRef}>{children}</h2>;
    case 3: return <h3 className={currentClassName} ref={titleRef}>{children}</h3>;
    case 4: return <h4 className={currentClassName} ref={titleRef}>{children}</h4>;
    case 5: return <h5 className={currentClassName} ref={titleRef}>{children}</h5>;
    case 6: return <h6 className={currentClassName} ref={titleRef}>{children}</h6>;
  }
};

export default Title;