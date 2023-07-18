import classes from './Video.module.scss';

export const Video = ({ post }) => {
  return (
    <div className={classes.video}>
      <video controls>
        <source src={post.media.url} type="video/mp4"></source>
      </video>
    </div>
  );
};