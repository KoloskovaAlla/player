import classes from './PlaybackControl.module.scss';
import { IconPlay, IconPause } from 'assets';

export const PlaybackControl = ({
  isPlaying,
  onPlayClick,
  onPauseClick,
}) => {
  return (
    <div className={classes.playbackControls}>
      {!isPlaying && (
        <button onClick={onPlayClick}>
          <IconPlay
            className={classes.play}
          />
        </button>
      )}
      {isPlaying && (
        <button onClick={onPauseClick}>
          <IconPause
            className={classes.pause}
          />
        </button>
      )}
    </div>
  );
};
