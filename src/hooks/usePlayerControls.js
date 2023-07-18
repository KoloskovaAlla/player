import { setDuration, setCurrentTime, setProgress } from 'store/slices/playerControlsSlice';
import { useSelector } from 'react-redux';

export const usePlayerControls = () => {
  const { duration } = useSelector((state) => state.playerControlsReducer);
  const { currentTime } = useSelector((state) => state.playerControlsReducer);
  const { progress } = useSelector((state) => state.playerControlsReducer);

  return {
    duration,
    currentTime,
    progress,
    setDuration,
    setCurrentTime,
    setProgress,
  };
};
