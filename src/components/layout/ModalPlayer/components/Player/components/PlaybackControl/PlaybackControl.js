import classes from './PlaybackControl.module.scss';
import { IconPlay, IconPause } from 'assets';

export const PlaybackControl = ({ isPlaying, onPlayClick, onPauseClick }) => {
  console.log(isPlaying)
  return (
    <div className={classes.playbackControls}>
      {!isPlaying && (
        <button>
          <IconPlay
            onClick={onPlayClick}
            className={classes.play}
          />
        </button>
      )}
      {isPlaying && (
        <button>
          <IconPause
            onClick={onPauseClick}
            className={classes.pause}
          />
        </button>
      )}
    </div>  
  )
};