import { useState } from 'react';
import SliderContext from '../contexts/SliderContext';

export const SliderProvider = ({ children }) => {
  const [slides, setSlides] = useState([]);
  const [slideDescription, setSlideDescription] = useState('');

  const value = {
    slides,
    setSlides,
    slideDescription,
    setSlideDescription
  };

  return (
    <SliderContext.Provider value={value}>
      {children}
    </SliderContext.Provider>
  );
};
