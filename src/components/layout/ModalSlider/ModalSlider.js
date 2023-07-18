import { memo, useRef, useState, useContext, useCallback, useEffect } from 'react';
import PreviewContext from 'contexts/PreviewContext';
import { debounce } from 'utils/helpers';
import Description from './components/Description';
import Slider from './components/Slider';

export const ModalSlider = memo(() => {

  const modalSliderRef = useRef(null);
  const sliderRef = useRef(null);
  const [isSliderMoveToCenter, setIsSliderMoveToCenter] = useState(false);
  const [isSliderBackward, setIsSliderBackward] = useState(false);
  const [isDescriptionHidden, setIsDescriptionHidden] = useState(true);
  const { previewDetails, setPreviewDetails } = useContext(PreviewContext);
  const [isSliderActive, setIsSliderActive] = useState(false);

  const className = 'modal-slider';

  const handleWindowResize = () => {
    setIsSliderMoveToCenter(true);
  };

  const handleCloseClick = useCallback(() => {
    setIsSliderActive(false);
    setIsSliderBackward(true);
    setIsDescriptionHidden(true);
  }, []);

  const reset = useCallback(() => {
    setPreviewDetails(null);
    setIsSliderBackward(false);
  }, [setPreviewDetails]);

  useEffect(() => {
    if (!isSliderActive) return;

    const debouncedHandleWindowResize = debounce(handleWindowResize, 500);
    window.addEventListener('resize', debouncedHandleWindowResize);

    return () => window.removeEventListener('resize', debouncedHandleWindowResize);

  }, [isSliderActive]);

  useEffect(() => {
    if (!previewDetails) return;

    sliderRef.current.style.top = previewDetails.top + 'px';
    sliderRef.current.style.left = previewDetails.left + 'px';
    sliderRef.current.style.width = previewDetails.width + 'px';
    sliderRef.current.style.height = previewDetails.height + 'px';

    const timerID = setTimeout(() => {
      setIsSliderActive(true);
      setIsDescriptionHidden(false);
      setIsSliderMoveToCenter(true);
    }, 500);

    return () => clearTimeout(timerID);

  }, [previewDetails]);

  useEffect(() => {
    if (!isSliderMoveToCenter) return;

    const modalSliderHeight = modalSliderRef.current.offsetHeight;
    const modalSliderWidth = modalSliderRef.current.offsetWidth;
    sliderRef.current.style.top = (((modalSliderHeight / 2)) - (previewDetails.height / 2)) + 'px';
    sliderRef.current.style.left = ((modalSliderWidth / 2) - (previewDetails.width / 2)) + 'px';
    setIsSliderMoveToCenter(false);

  }, [isSliderMoveToCenter, previewDetails]);

  useEffect(() => {
    if (!isSliderBackward) return;

    sliderRef.current.style.top = previewDetails.top + 'px';
    sliderRef.current.style.left = previewDetails.left + 'px';

    const timerID = setTimeout(reset, 500);

    return () => clearTimeout(timerID);

  }, [isSliderBackward, previewDetails, reset]);

  if (!previewDetails) return null;

  return (
    <div className={className} ref={modalSliderRef}>
      <Description
        parentClassName={className}
        isDescriptionHidden={isDescriptionHidden}
      />

      <Slider
        ref={sliderRef}
        currentSlideID={previewDetails.id}
        slideWidth={previewDetails.width}
        isSliderBackward={isSliderBackward}
        onCloseClick={handleCloseClick}
      />

      <div
        className={`${className}__overlay`}
        onClick={handleCloseClick}
      ></div>
    </div>
  );
});
