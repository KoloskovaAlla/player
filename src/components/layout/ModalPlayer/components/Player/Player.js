import classes from './Player.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useTheme, useCurrentPodcast } from 'hooks';
import { PlaybackControl, Progress, VolumeControl } from './components';
import { classNames } from 'utils/helpers';

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
  const [statevolume, setStateVolume] = useState(0.3);
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
    setStateVolume(event.target.value / 100);
    audio.volume = event.target.value / 100;
  };

  return (
    <div
      className={playerClassNames}
    >
      <div className={classes.wrapper}>
        <div className={classes.image}>
          <img src={podcast?.image?.src} alt={podcast?.image?.alternate} />
        </div>
           
        <Progress
          duration={duration}
          currentTime={currentTime}
          onProgressChange={handleProgressChange}         
          setIsSeeking={setIsSeeking}   
          progressRef={progressRef}
          thumbRef={thumbRef}   
        />

        <div className={classes.time}>
          <div>{minutes}:{seconds}</div>
          <div> - {minutesLeft}:{secondsLeft}</div>
        </div>

        <div className={classes.info}>
          <h3 className={classes.title}>{podcast?.title}</h3>
          <h4 className={classes.subtitle}>{podcast?.subtitle}</h4>
        </div>
        <PlaybackControl 
          isPlaying={isPlaying}
          onPlayClick={handlePlayClick}
          onPauseClick={handlePauseClick}
        /> 

        <VolumeControl 
          statevolume={statevolume}          
          onVolumeChange={handleVolumeChange}
          setIsChangingVolume={setIsChangingVolume}
        />
      </div>
    </div>
  );
};