import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { usePodcasts, useModal } from 'hooks';
import { ModalPlayer } from 'components/layout/ModalPlayer';
import { PodcastPreview } from './components';
import classes from './PodcastsPage.module.scss';

export const PodcastsPage = () => {
  const dispatch = useDispatch();
  const { fetchPodcastsData, podcastsData } = usePodcasts();
  const { isModalOpen } = useModal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(fetchPodcastsData());
  }, [dispatch, fetchPodcastsData]);

  if (!podcastsData) return (
    <div className={classes.wrapper}>
      <div className={classes.nopodcasts}>Подкастов пока нет, но скоро они появятся здесь</div>
    </div>
  );

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
