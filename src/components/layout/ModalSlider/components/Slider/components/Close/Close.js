import { memo } from 'react';
import { ReactComponent as CloseIcon } from './assets/close.svg';

const Close = memo(({ parentClassName, onCloseClick }) => {

  const className = parentClassName
    ? `${parentClassName}__close`
    : 'close';

  return (
    <button
      className={className}
      type='button'
      onClick={onCloseClick}
    >
      <CloseIcon />
    </button>
  );
});

export default Close;