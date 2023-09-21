import classes from './PlaybackControl.module.scss';
import { IconPlay, IconPause } from 'assets';

export const PlaybackControl = ({ isPlaying, onPlayClick, onPauseClick }) => {
  return (
    <div className={classes.playbackControls}>
      {!isPlaying && (
        <button>
          <IconPlay
            className={classes.play}
            onClick={onPlayClick}
          />
        </button>
      )}
      {isPlaying && (
        <button>
          <IconPause
            className={classes.pause}
            onClick={onPauseClick}
          />
        </button>
      )}
    </div>  
  );
};