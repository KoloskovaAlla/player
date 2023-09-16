import { usePlaying, useModal, useCurrentPodcast } from 'hooks';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
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
  const { setPodcastKey, setPodcastId } = useCurrentPodcast();

  useEffect(() => {
    if (!playButtonRef.current) return;
  }, [isHover]);

  const handlePodcastClick = () => {
    dispatch(setPodcastId(podcast.id));
    dispatch(setPodcastKey(podcast.key));
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
  };

  const handleTitleClick = () => {
    dispatch(setPodcastId(podcast.id));
    dispatch(setPodcastKey(podcast.key));
    dispatch(setPodcast(podcast));
  };

  return (
    <>
      <div
        ref={audioRef}
        className={classes.podcast}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={classes.audioCover}
          ref={audioCoverRef}
          onClick={handlePodcastClick}
        >
          <div className={classes.image} >
            <img
              ref={imageRef}
              src={podcast?.image?.src && podcast.image.src}
              alt={podcast?.image?.alternate && podcast.image.alternate}
            />
          </div>
          {isHover && !isPlaying && (
            <IconPlay
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

        <Link to={`/podcasts/${podcast.key}`}>
          <div
            className={classes.body}
            onClick={handleTitleClick}
          >
            <h3 className={classes.title}>{podcast.title}</h3>
            <h4 className={classes.subtitle}>{podcast.subtitle}</h4>
          </div>
        </Link>
      </div>
    </>
  );
};
