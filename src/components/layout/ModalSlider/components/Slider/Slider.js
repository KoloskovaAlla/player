import { forwardRef, useContext, useState, useEffect } from 'react';
import SliderContext from 'contexts/SliderContext';
import Close from './components/Close';
import SlidesWrapper from './components/SlidesWrapper';
import Control from './components/Control';
import Pagination from './components/Pagination';

const Slider = forwardRef(({
  currentSlideID,
  slideWidth,
  isSliderBackward,
  onCloseClick
}, ref) => {

  const { slides, setSlideDescription } = useContext(SliderContext);

  const [activeSlideID, setActiveSlideID] = useState(currentSlideID);
  const [touchStartХ, setTouchStartХ] = useState(null);
  const [touchEndХ, setTouchEndХ] = useState(null);
  const [isControlsHidden, setIsControlsHidden] = useState(false);

  const className = 'slider';

  useEffect(() => {
    if (!touchStartХ || !touchEndХ) return;

    if (touchStartХ > touchEndХ) {
      setActiveSlideID((prevID) => (
        prevID < slides.length
          ? prevID + 1
          : prevID
      ));
    }

    if (touchStartХ < touchEndХ) {
      setActiveSlideID((prevID) => (
        prevID > 1
          ? prevID - 1
          : prevID
      ));
    }

    setTouchStartХ(null);
    setTouchEndХ(null);

  }, [touchStartХ, touchEndХ, slides]);

  useEffect(() => {
    if (!isSliderBackward) {
      setSlideDescription(slides[activeSlideID - 1].alternate);
    }
  }, [activeSlideID, isSliderBackward, setSlideDescription, slides]);

  useEffect(() => {
    if (isSliderBackward) {
      setIsControlsHidden(true);
      setActiveSlideID(currentSlideID);
    }
  }, [isSliderBackward, currentSlideID]);

  const handleSliderTouchStart = (event) => {
    const startX = Math.floor(event.changedTouches[0].clientX);
    setTouchStartХ(startX);
  };

  const handleSliderTouchEnd = (event) => {
    const endX = Math.floor(event.changedTouches[0].clientX);
    setTouchEndХ(endX);
  };

  const handlePrevClick = () => {
    setActiveSlideID((prevID) => prevID > 1 ? prevID - 1 : prevID);
  };

  const handleNextClick = () => {
    setActiveSlideID((prevID) => prevID < slides.length ? prevID + 1 : prevID);
  };

  return (
    <div
      className={className}
      ref={ref}
      onTouchStart={handleSliderTouchStart}
      onTouchEnd={handleSliderTouchEnd}
    >
      <Close
        parentClassName={className}
        onCloseClick={onCloseClick}
      />

      <SlidesWrapper
        parentClassName={className}
        slides={slides}
        activeSlideID={activeSlideID}
        slideWidth={slideWidth}
      />

      <Control
        type='prev'
        parentClassName={className}
        isDisabled={activeSlideID === 1}
        isControlsHidden={isControlsHidden}
        onControlClick={handlePrevClick}
      />

      <Control
        type='next'
        parentClassName={className}
        isDisabled={activeSlideID === slides.length}
        isControlsHidden={isControlsHidden}
        onControlClick={handleNextClick}
      />

      <Pagination
        parentClassName={className}
        isControlsHidden={isControlsHidden}
        activeSlideID={activeSlideID}
        slidesLength={slides.length}
      />
    </div>
  );
});

export default Slider;