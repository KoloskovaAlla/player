import { useSelector } from 'react-redux';
import { fetchPodcastsSectionData } from 'store/slices/podcastsSectionSlice';

export const usePodcastsSection = () => {
  const {
    isLoading,
    podcastsSectionData,
    errorMessage
  } = useSelector((state) => state.podcastsSectionReducer);

  return {
    fetchPodcastsSectionData,
    isLoading,
    podcastsSectionData,
    errorMessage,
  };
};
