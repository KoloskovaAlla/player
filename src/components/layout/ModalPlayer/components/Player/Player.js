import { useCurrentPodcast } from 'hooks';
import classes from './Player.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'hooks';
import { classNames } from 'utils/helpers';
import { IconPlay, IconPause, IconMuteSound, IconMaxSound } from './assets';

export const Player = ({ setIsSeeking, setIsChangingVolume }) => {
  const { theme } = useTheme();
 
  const { id, podcast } = useCurrentPodcast();

  const [audio, setAudio] = useState(null);

  const [currentTime, setCurrentTime] = useState(null);
  const [duration, setDuration] = useState(null);
  const [progress, setProgress] = useState(null);
  const [minutes, setMinutes] = useState();
  const [minutesLeft, setMinutesLeft] = useState();
  const [secondsLeft, setSecondsLeft] = useState();
  const [seconds, setSeconds] = useState();

  const [statevolum, setStateVolum] = useState(0.3);

  const [isPlaying, setIsPlaying] = useState(true);

  const playerClassNames = classNames(classes.player, {
    [classes.dark]: theme === 'dark',
  });

  const thumbRef = useRef();
  const progressRef = useRef();

  useEffect(() => {
    if (!podcast) return;
    const { audio: { src } } = podcast;
    let audio = new Audio(src);
    setAudio(audio);
  }, [id, podcast]);

  const handlePlayClick = () => {
    setIsPlaying(true);
    audio.play();
  };

  const handlePauseClick = () => {
    setIsPlaying(false);
    audio.pause();
  }; 

  const handleAudioTimeUpdate = (event) => {
    const { target: { duration, currentTime } } = event;
    const progress = currentTime / duration;
    setProgress(progress);
    progressRef.current.style.width = `${progress * 100}%`;
    thumbRef.current.style.left = `${progress * 100}%`;
    setDuration(duration);
    setCurrentTime(currentTime);
    setMinutes(Math.floor(currentTime / 60));
    setMinutesLeft(Math.floor((duration - currentTime) / 60));
    setSeconds(Math.floor(currentTime - Math.floor(currentTime / 60) * 60));
    setSecondsLeft(Math.floor(duration - currentTime - (Math.floor((duration - currentTime) / 60)) * 60));
  };

  useEffect(() => {
    if (!audio) return;
    audio.play();
    audio.addEventListener('timeupdate', handleAudioTimeUpdate);
    return () => {
      audio.removeEventListener('timeupdate', handleAudioTimeUpdate);
      audio.pause();
    }
  }, [audio, id]);

  const handleProgressChange = (event) => {
    const changedCurrentTime = event.target.value * duration;
    thumbRef.current.style.left = `${changedCurrentTime / duration * 100}%`;
    progressRef.current.style.width = `${changedCurrentTime / duration * 100}%`;
    setCurrentTime(changedCurrentTime);
    event.target.value = `${changedCurrentTime / duration}`;
    audio.currentTime = changedCurrentTime;
  };

  const handleVolumeChange = (event) => {
    setStateVolum(event.target.value / 100);
    audio.volume = event.target.value / 100;
  };

  const handleVolumeThumbMove = (event) => {
    event.stopPropagation();
    setIsChangingVolume(true);
  };

  const handleVolumeThumbStart = (event) => {
    event.stopPropagation();
    setIsChangingVolume(true);   
  };

  const handleVolumeThumbEnd = (event) => {
    event.stopPropagation();
    setIsChangingVolume(false);   
  };

  const handleVolumeThumbCancel = (event) => {
    event.stopPropagation();
    setIsChangingVolume(false);   
  };

  const handleTouchMoveProgress = (event) => {
    event.stopPropagation();
    setIsSeeking(true);
  };

  const handleTouchStartProgress = (event) => {
    event.stopPropagation();
    setIsSeeking(true);
  };

  const handleTouchEndProgress = (event) => {
    event.stopPropagation();
    setIsSeeking(false);
  };

  const handleTouchCancelProgress = (event) => {  
    event.stopPropagation();
    setIsSeeking(false);
  };

  return (
    <div
      className={playerClassNames}
    >
      <div className={classes.wrapper}>
        <div className={classes.image}>
          <img src={podcast?.image?.src} alt={podcast?.image?.alternate} />
        </div>

        <label className={classes.playerProgress}>
          <div className={classes.progress_bar}>
            <div
              className={classes.progress}
              ref={progressRef}
            />
            <div
              ref={thumbRef}
              className={classes.thumb}
            >
            </div>
          </div>
          <input
            className={classes.progress_input}
            type="range"
            min="0"
            max="1"
            step="any"
            value={`${currentTime / duration}`}
            onInput={handleProgressChange}
            onTouchMove={handleTouchMoveProgress}
            onTouchStart={handleTouchStartProgress}
            onTouchEnd={handleTouchEndProgress}
            onTouchCancel={handleTouchCancelProgress}
          />
        </label>

        <div className={classes.time}>
          <div>{minutes}:{seconds}</div>
          <div> - {minutesLeft}:{secondsLeft}</div>
        </div>

        <div className={classes.info}>
          <h3 className={classes.title}>{podcast?.title}</h3>
          <h4 className={classes.subtitle}>{podcast?.subtitle}</h4>
        </div>

        <div className={classes.navigation}>
          {!isPlaying && (
            <button>
              <IconPlay
                onClick={handlePlayClick}
                className={classes.play}
              />
            </button>
          )}
          {isPlaying && (
            <button>
              <IconPause
                onClick={handlePauseClick}
                className={classes.pause}
              />
            </button>
          )}
        </div>

        <div className={classes.volumeControl}>
          <IconMuteSound className={classes.muteSound} />
          <label className={classes.volume}>
            <div className={classes.volumeWrapper}>
              <div
                className={classes.volumeCurrent}
                style={{ width: `${Math.round(statevolum * 100)}%`, height: '5px', background: '#333' }}>
              </div>
              <div
                onTouchMove={handleVolumeThumbMove}
                onTouchStart={handleVolumeThumbStart}
                onTouchEnd={handleVolumeThumbEnd}
                onTouchCancel={handleVolumeThumbCancel}
                // onClick={handleVolumeThumbTouch}
                className={classes.volumeThumb}
                style={{ left: `${Math.round(statevolum * 100)}%` }}
              >
              </div>
            </div>
            <input
              className={classes.volume_input}
              value={Math.round(statevolum * 100)}
              type="range" name="volBar" id="volBar"
              onChange={handleVolumeChange}
              onTouchMove={handleVolumeThumbMove}
              onTouchStart={handleVolumeThumbStart}
              onTouchEnd={handleVolumeThumbEnd}
              onTouchCancel={handleVolumeThumbCancel}
            />
          </label>
          <IconMaxSound className={classes.maxsound} />
        </div>
      </div>
    </div>
  );
};