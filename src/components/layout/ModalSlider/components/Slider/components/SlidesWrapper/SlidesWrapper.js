const SlidesWrapper = ({
  parentClassName,
  slides,
  activeSlideID,
  slideWidth
}) => {

  const left = activeSlideID !== 1
    ? -(slideWidth * (activeSlideID - 1)) + 'px'
    : 0;

  const currentClassName = parentClassName
    ? `${parentClassName}__slides`
    : 'slides';

  const childClassName = parentClassName
    ? `${parentClassName}__slide`
    : 'slide';

  return (
    <div className={currentClassName} style={{ left }}>
      {slides.map((slide, index) => (
        <img
          className={childClassName}
          style={{ width: `${slideWidth}px` }}
          key={index}
          src={slide.source}
          alt={slide.alternate}
        />
      ))}
    </div>
  );
};

export default SlidesWrapper;