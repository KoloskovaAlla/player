import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePodcastsSection } from 'hooks';
import { Slider } from './components/Slider';
import classes from './PodcastsSection.module.scss';

export const PodcastsSection = () => {
  const dispatch = useDispatch();
  const { fetchPodcastsSectionData, podcastsSectionData } = usePodcastsSection();

  useEffect(() => {
    dispatch(fetchPodcastsSectionData())
  }, [dispatch, fetchPodcastsSectionData]);

  if (!podcastsSectionData) return null;

  return (
    <section className={classes.audio}>
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <h2 className={classes.title}>{podcastsSectionData.title}</h2>
          <Link
            className={classes.link}
            to='/podcasts'
          >
            {podcastsSectionData.textButton}
          </Link>
        </div>

        <Slider podcasts={podcastsSectionData.podcasts} />
      </div>
    </section>
  );
};
