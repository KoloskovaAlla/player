import { useEffect } from 'react';
import { setIsPlaying } from 'store/slices/playingSlice';
import { useSelector } from 'react-redux';

export const usePlaying = () => {
  const { isPlaying } = useSelector((state) => state.playingReducer);

  useEffect(() => {
    localStorage.setItem('isPlaying', isPlaying); 
  }, [isPlaying]);

  return {
    isPlaying,
    setIsPlaying,
  };
};