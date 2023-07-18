import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { usePost } from 'hooks';
import { Image, Video } from './components';
import classes from './PostPage.module.scss';
import Preloader from 'components/layout/Preloader';
import Text from 'components/common/Text';
import Title from 'components/common/Title/Title.js';

export const PostPage = () => {
  const dispatch = useDispatch();
  const { fetchPostData, postData: post, isLoading } = usePost();

  const params = useParams();
  const { key } = params;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(fetchPostData(key));
  }, [dispatch, fetchPostData, key]);

  return (
    <>
      {isLoading && <Preloader />}

      {post && (
        <div className={classes.postPage}>
          <div className={classes.header}>
            {post.media.type === 'image' && (
              <Image details={post.media} />
            )}
            {post.media.type === 'video' && (
              <Video post={post} />
            )}
          </div>

          <div className={classes.body}>
            <Title className={classes.title}>
              {post.title}
            </Title>

            {post.article?.length > 0 && post.article.map((text, index) => (
              <Text key={index} className={classes.copy}>
                {text}
              </Text>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
