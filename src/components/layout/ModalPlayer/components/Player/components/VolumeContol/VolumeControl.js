import classes from './VolumeControl.module.scss';
import { IconMuteSound, IconMaxSound } from 'assets';

export const VolumeControl = ({ volume, onVolumeChange, setIsChangingVolume }) => {
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

  return (
    <div className={classes.volumeControl}>
      <IconMuteSound className={classes.muteSound} />
      <label className={classes.volume}>
        <div className={classes.volumeWrapper}>
          <div
            className={classes.volumeCurrent}
            style={{ width: `${Math.round(volume * 100)}%`, height: '5px', background: '#333' }}>
          </div>
          <div
            onTouchMove={handleVolumeThumbMove}
            onTouchStart={handleVolumeThumbStart}
            onTouchEnd={handleVolumeThumbEnd}
            onTouchCancel={handleVolumeThumbCancel}
            // onClick={handleVolumeThumbTouch}
            className={classes.volumeThumb}
            style={{ left: `${Math.round(volume * 100)}%` }}
          >
          </div>
        </div>
        <input
          className={classes.volume_input}
          value={Math.round(volume * 100)}
          type="range" name="volBar" id="volBar"
          onChange={onVolumeChange}
          onTouchMove={handleVolumeThumbMove}
          onTouchStart={handleVolumeThumbStart}
          onTouchEnd={handleVolumeThumbEnd}
          onTouchCancel={handleVolumeThumbCancel}
        />
      </label>
      <IconMaxSound className={classes.maxsound} />
    </div>
  )
};
