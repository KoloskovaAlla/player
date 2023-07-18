import Title from 'components/common/Title';
import { ReactComponent as PlusIcon } from './assets/plus.svg';
import clsx from 'clsx';

const AccItemHeader = ({ parentClassName, title, isOpen }) => {

  const className = parentClassName
    ? `${parentClassName}__header`
    : 'item';

  const iconClassName = parentClassName
    ? `${parentClassName}__icon`
    : 'icon';

  const iconClassNames = clsx(iconClassName, {
    'rotate': isOpen
  });

  return (
    <div className={className}>
      <Title
        parentClassName={parentClassName}
        priority={title.priority}
      >
        {title.content}
      </Title>

      <span className={iconClassNames}>
        <PlusIcon />
      </span>
    </div>
  );
};

export default AccItemHeader;