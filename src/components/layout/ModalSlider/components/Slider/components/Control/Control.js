import { ReactComponent as ArrowLeftIcon } from './assets/left.svg';
import { ReactComponent as ArrovRightIcon } from './assets/right.svg';
import clsx from 'clsx';

const Control = ({
  type,
  parentClassName,
  isDisabled,
  isControlsHidden,
  onControlClick
}) => {

  const className = parentClassName
    ? `${parentClassName}__${type}`
    : type;

  const classNames = clsx(className, {
    'hidden': isControlsHidden
  });

  return (
    <button
      className={classNames}
      type='button'
      disabled={isDisabled}
      onClick={onControlClick}
    >
      {
        type === 'prev'
          ? <ArrowLeftIcon />
          : <ArrovRightIcon />
      }
    </button>
  );
};

export default Control;