import { setPodcast, setKey, setId } from 'store/slices/currentPodcastSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export const useCurrentPodcast = () => {
  const { podcast, id, key } = useSelector((state) => state.currentPodcastReducer);

  useEffect(() => {
    localStorage.setItem('podcast', JSON.stringify(podcast));
    localStorage.setItem('id', id);
    localStorage.setItem('key', key);
  }, [podcast]);

  return {
    podcast,
    id,
    key,
    setPodcast,
    setKey,
    setId,
  };
};