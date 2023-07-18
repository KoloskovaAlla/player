import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { PostPreview } from './components';
import { usePosts } from 'hooks';
import classes from './PostsPage.module.scss';
import Preloader from 'components/layout/Preloader';

export const PostsPage = () => {
  const dispatch = useDispatch();
  const { fetchPostsData, postsData: posts, isLoading } = usePosts();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(fetchPostsData());
  }, [dispatch, fetchPostsData]);

  return (
    <>
      {isLoading && <Preloader />}

      {posts?.length > 0 && (
        <div className={classes.posts}>
          <div className={classes.wrapper}>
            <ul className={classes.list}>
              {posts.map((post, index) => (
                <li
                  className={classes.listItem}
                  key={index}
                >
                  <PostPreview details={post} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
