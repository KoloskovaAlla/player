import classes from './Progress.module.scss';

export const Progress = ({
  handleProgressChange, 
  currentTime,
  duration,
  progressRef,
  thumbRef,  
  setIsSeeking,
}) => {
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
