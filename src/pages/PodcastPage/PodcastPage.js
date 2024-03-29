import { useDispatch } from 'react-redux';
import { usePodcast, usePlaying, useModal } from 'hooks';
import Preloader from 'components/layout/Preloader';
import { ModalPlayer } from 'components/layout/ModalPlayer';
import { ReactComponent as IconPlay } from './assets/play.svg'
import classes from './PodcastPage.module.scss';

export const PodcastPage = () => {
  const dispatch = useDispatch();

  const { podcast, setKey, setId, setPodcast } = usePodcast();
  const { setIsPlaying } = usePlaying();
  const { setIsModalOpen, isModalOpen } = useModal();

  const handlePodcastClick = () => {
    dispatch(setId(podcast.id));
    dispatch(setKey(podcast.key));
    dispatch(setPodcast(podcast));
    dispatch(setIsPlaying(true));
    dispatch(setIsModalOpen(true));
  };

  return (
    <>
      {/* {isLoading && <Preloader />} */}

      {podcast && (
        <div className={classes.podcastPage}>
          <div className={classes.wrapper}>
            <div
              className={classes.audioCover}
              onClick={handlePodcastClick}
            >
              <div className={classes.image} >
                <img src={podcast?.image?.src} alt={podcast.image.alternate} />
              </div>

              <IconPlay className={classes.play} />

            </div>

            <div className={classes.body}>
              <h3 className={classes?.title}>{podcast.title}</h3>
              <h4 className={classes.subtitle}>{podcast.subtitle}</h4>
              {podcast?.texts?.length > 0 && podcast.texts.map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      {isModalOpen && <ModalPlayer />}
    </>
  )
};
