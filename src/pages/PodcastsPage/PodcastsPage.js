import classes from './PodcastsPage.module.scss';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { usePodcasts, useModal } from 'hooks';
import { PodcastPreview, ModalPlayer, Preloader } from 'components/layout';

export const PodcastsPage = () => {
  const dispatch = useDispatch();
  const { fetchPodcastsData, podcastsData } = usePodcasts();
  const { isModalOpen } = useModal();

  useEffect(() => {
    dispatch(fetchPodcastsData());
  }, [dispatch, fetchPodcastsData]);

  if (!podcastsData) return <Preloader />

  if (podcastsData) return (
    <div className={classes.wrapper}>
      <ul className={classes.list}>
        {Object.values(podcastsData).map((podcast, index) => (
          <li
            className={classes.listItem}
            key={index}
          >
            <PodcastPreview podcast={podcast} />
          </li>
        ))}
        {isModalOpen && <ModalPlayer />}
      </ul>
    </div>
  );
};
