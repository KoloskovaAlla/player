import { setPodcast, setPodcastKey, setPodcastId } from 'store/slices/currentPodcastSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export const useCurrentPodcast = () => {
  const { podcast, podcastId, podcastKey } = useSelector((state) => state.currentPodcastReducer);

  useEffect(() => {
    localStorage.setItem('podcast', JSON.stringify(podcast));
    localStorage.setItem('id', podcastId);
    localStorage.setItem('key', podcastKey);
  }, [podcast]);

  return {
    podcast,
    podcastId,
    podcastKey,
    setPodcast,
    setPodcastKey,
    setPodcastId,
  };
};
