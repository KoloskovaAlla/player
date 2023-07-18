import { usePlaying, useModal, useCurrentPodcast } from 'hooks';
import { useDispatch } from 'react-redux';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { setPodcast } from 'store/slices/currentPodcastSlice';
import { ReactComponent as IconPlay } from './assets/play.svg'
import { ReactComponent as IconPause } from './assets/pause.svg'
import classes from './PodcastPreview.module.scss';

export const PodcastPreview = ({ podcast }) => {
  const [isHover, setIsHover] = useState(false);

  const audioRef = useRef(null);
  const audioCoverRef = useRef(null);
  const imageRef = useRef(null);
  const playButtonRef = useRef(null);
  const pauseButtonRef = useRef(null);

  const dispatch = useDispatch();

  const { setIsModalOpen } = useModal();
  const { isPlaying, setIsPlaying } = usePlaying();
  const { setKey } = useCurrentPodcast();
  const { setId } = useCurrentPodcast();

  useEffect(() => {
    if (!playButtonRef.current) return;
  }, [isHover]);

  const handlePodcastClick = () => {
    dispatch(setId(podcast.id));
    dispatch(setKey(podcast.key));
    dispatch(setPodcast(podcast));
    dispatch(setIsPlaying(true));
    dispatch(setIsModalOpen(true));
  };

  const handleMouseEnter = () => {
    setIsHover(true);
    imageRef.current.style.scale = '1.2';
    imageRef.current.style.transitionProperty = 'all';
    imageRef.current.style.transitionDuration = '1s';
  };

  const handleMouseLeave = () => {
    setIsHover(false);
    imageRef.current.style.scale = '1';
    imageRef.current.style.transitionProperty = 'all';
  }

  return (
    <div
      ref={audioRef}
      className={classes.podcast}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handlePodcastClick}
    >
      <div className={classes.audioCover} ref={audioCoverRef}>
        <div className={classes.image} >
          <img ref={imageRef} src={podcast.image.src} alt={podcast.image.alternate} />
        </div>
        {isHover && !isPlaying && (
          <IconPlay
            // onClick={handlePlayClick}
            className={classes.play}
            ref={playButtonRef}
          />
        )}
        {isHover && isPlaying && (
          <IconPause
            className={classes.pause}
            ref={pauseButtonRef}
          />)
        }
      </div>

      <div className={classes.body}>
        <h3 className={classes.title}>{podcast.title}</h3>
        <p className={classes.description}>{podcast.description}</p>
      </div>
    </div>
  );
};
