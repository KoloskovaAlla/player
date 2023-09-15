import classes from './Progress.module.scss';

export const Progress = ({
  handleProgressChange,
  handleTouchMoveProgress,
  handleTouchStartProgress,
  handleTouchCancelProgress,
  currentTime,
  duration,
  progressRef,
  thumbRef,
  handleTouchEndProgress,
}) => {
  return (
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
  )
};
