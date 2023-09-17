import classes from './PlaybackControl.module.scss';
import { IconPlay, IconPause } from 'assets';

export const PlaybackControl = ({ isPlaying }) => {
  <div className={classes.playbackControls}>
    {!isPlaying && (
      <button>
        <IconPlay
          // onClick={handlePlayClick}
          className={classes.play}
        />
      </button>
    )}
    {isPlaying && (
      <button>
        <IconPause
          // onClick={handlePauseClick}
          className={classes.pause}
        />
      </button>
    )}
  </div>  
};