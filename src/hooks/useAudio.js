import { useSelector } from 'react-redux';

export const useAudio = () => {
  const {
    isLoading,
    fetchAudio,
    errorMessage
  } = useSelector((state) => state.audioReducer);

  return {
    fetchAudio,
    isLoading,
    errorMessage,
  };
};