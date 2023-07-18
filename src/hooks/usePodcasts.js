import { useSelector } from 'react-redux';
import { fetchPodcastsData } from 'store/slices/podcastsSlice';

export const usePodcasts = () => {
  const {
    isLoading,
    podcastsData,
    errorMessage
  } = useSelector((state) => state.podcastsReducer);

  return {
    fetchPodcastsData,
    isLoading,
    podcastsData,
    errorMessage,
  };
};
