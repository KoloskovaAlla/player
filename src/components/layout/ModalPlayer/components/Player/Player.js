import classes from './Player.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useTheme, usePodcast } from 'hooks';
import { PlaybackControl, Progress, VolumeControl } from './components';
import { classNames } from 'utils/helpers';

export const Player = ({ setIsSeeking, setIsChangingVolume }) => {
  const { theme } = useTheme();

  const { id, podcast } = usePodcast();
  const [audio, setAudio] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [duration, setDuration] = useState(null);
  const [progress, setProgress] = useState(null);
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  const [remainigMinutes, setRemainigMinutes] = useState();
  const [remainigSeconds, setRemainigSeconds] = useState();
  const [volume, setVolume] = useState(0.3);
  const [isPlaying, setIsPlaying] = useState(true);

  const playerClassNames = classNames(classes.player, {
    [classes.dark]: theme === 'dark',
  });

  const thumbRef = useRef();
  const progressRef = useRef(); 

  const handlePlayClick = () => {
    setIsPlaying(true);
    audio.play();
  };

  const handlePauseClick = () => {
    setIsPlaying(false);
    audio.pause();
  };

  const handleAudioTimeUpdate = ({ target: { duration, currentTime } }) => {
    const progress = currentTime / duration;
    const currentMinutes = Math.floor(currentTime / 60);
    const remainingMinutes = Math.floor((duration - currentTime) / 60);
    const currentSeconds = Math.floor(currentTime - currentMinutes * 60);
    const remainingSeconds = Math.floor(duration - currentTime - remainingMinutes * 60);

    setProgress(progress);
    progressRef.current.style.width = `${progress * 100}%`;
    thumbRef.current.style.left = `${progress * 100}%`;
    setDuration(duration);
    setCurrentTime(currentTime);
    setMinutes(currentMinutes);
    setRemainigMinutes(remainingMinutes);
    setSeconds(currentSeconds);
    setRemainigSeconds(remainingSeconds);
  };

  const handleProgressChange = ({ target: { value } }) => {
    const changedCurrentTime =value * duration;
    thumbRef.current.style.left = `${changedCurrentTime / duration * 100}%`;
    progressRef.current.style.width = `${changedCurrentTime / duration * 100}%`;
    setCurrentTime(changedCurrentTime);
    value = `${changedCurrentTime / duration}`;
    audio.currentTime = changedCurrentTime;
  };

  const handleVolumeChange = ({ target: { value } }) => {
    setVolume(value / 100);
    audio.volume = value / 100;
  };

  useEffect(() => {
    if (!podcast) return;
    const { audio: { src } } = podcast;
    const audio = new Audio(src);
    setAudio(audio);
  }, [id, podcast]);

  useEffect(() => {
    if (!audio) return;
    audio.play();
    audio.addEventListener('timeupdate', handleAudioTimeUpdate);
    return () => {
      audio.removeEventListener('timeupdate', handleAudioTimeUpdate);
      audio.pause();
    };
  }, [audio, id]);

  return (
    <div className={playerClassNames}>
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
          <div> - {remainigMinutes}:{remainigSeconds}</div>
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
          volume={volume}          
          onVolumeChange={handleVolumeChange}
          setIsChangingVolume={setIsChangingVolume}
        />
      </div>
    </div>
  );
};
