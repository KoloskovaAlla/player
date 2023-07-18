import classes from './Image.module.scss';

export const Image = ({ details }) => {
  return (
    <div className={classes.image}>
      <img
        src={details?.src}
        alt={details?.alternate}
      />
    </div >
  );
};