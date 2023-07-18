import { useSelector } from 'react-redux';
import { fetchPostData } from 'store/slices/postSlice';

/**  
 * @returns {object}
 */

export const usePost = () => {
  const {
    isLoading,
    postData,
    errorMessage
  } = useSelector((state) => state.postReducer);

  return {
    fetchPostData,
    isLoading,
    postData,
    errorMessage,
  };
};
