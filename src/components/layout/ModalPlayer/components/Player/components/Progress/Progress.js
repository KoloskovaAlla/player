import classes from './Progress.module.scss';

export const Progress = ({
  onProgressChange,
  currentTime,
  duration,
  progressRef,
  thumbRef,
  setIsSeeking,
}) => {
  const handleProgressTouchMove = (event) => {
    event.stopPropagation();
    setIsSeeking(true);
  };

  const handleProgressTouchStart = (event) => {
    event.stopPropagation();
    setIsSeeking(true);
  };

  const handleProgressTouchEnd = (event) => {
    event.stopPropagation();
    setIsSeeking(false);
  };

  const handleProgressTouchCancel = (event) => {
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
          className={classes.thumb}
          ref={thumbRef}
        />
      </div>
      <input
        className={classes.progress_input}
        type="range"
        min="0"
        max="1"
        step="any"
        value={`${currentTime / duration}`}
        onInput={onProgressChange}
        onTouchMove={handleProgressTouchMove}
        onTouchStart={handleProgressTouchStart}
        onTouchEnd={handleProgressTouchEnd}
        onTouchCancel={handleProgressTouchCancel}
      />
    </label>
  );
};
