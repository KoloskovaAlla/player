import { setPodcast, setPodcastKey, setPodcastId } from 'store/slices/podcastSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export const usePodcast = () => {
  const { podcast, podcastId, podcastKey } = useSelector((state) => state.podcastReducer);

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
