import { useEffect } from 'react';
import { setIsPlayer } from 'store/slices/playerSlice';
import { useSelector } from 'react-redux';

export const usePlayer = () => {
  const { isPlayer } = useSelector((state) => state.playerReducer);


  useEffect(() => {
    localStorage.setItem('isPlayer', isPlayer);
  }, [isPlayer]);

  return {
    isPlayer,
    setIsPlayer,
  };
};
