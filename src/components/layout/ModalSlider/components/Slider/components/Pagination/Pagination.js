import clsx from 'clsx';

const Pagination = ({
  parentClassName,
  isControlsHidden,
  activeSlideID,
  slidesLength
}) => {

  const className = parentClassName
    ? `${parentClassName}__pagination`
    : 'pagination';

  const classNames = clsx(className, {
    'hidden': isControlsHidden
  });

  return (
    <p className={classNames}>
      {`${activeSlideID} / ${slidesLength}`}
    </p>
  );
};

export default Pagination;