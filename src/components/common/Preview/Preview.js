import { useContext, useRef, useEffect, useState } from 'react';
import { useAnimateRef } from 'hooks';
import PreviewContext from 'contexts/PreviewContext';
import SliderContext from 'contexts/SliderContext';
import Spiner from 'components/common/Spiner';

const Preview = ({ image }) => {
  const { setPreviewDetails } = useContext(PreviewContext);
  const { setSlides } = useContext(SliderContext);
  const previewRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useAnimateRef(previewRef);

  useEffect(() => {
    setSlides((prevSlides) => [...prevSlides, image]);
  }, [image, setSlides]);

  const handlePreviewClick = (event) => {
    const { src: source, alt: alternate } = event.currentTarget.children[0];
    const { top, left, width, height } = event.currentTarget.getBoundingClientRect();

    const previewDetails = {
      id: Number.parseInt(image.id, 10),
      source,
      alternate,
      top,
      left,
      width,
      height,
    };

    setPreviewDetails(previewDetails);
  };

  return (
    <button
      className='preview'
      ref={previewRef}
      onClick={handlePreviewClick}
    >
      {!isLoaded && (
        <div className='preloader'>
          <Spiner />
        </div>
      )}
      <img
        onLoad={() => {setIsLoaded(true)}}
        src={image.source}
        alt={image.alternate}
      />
    </button>
  );
};

export default Preview;