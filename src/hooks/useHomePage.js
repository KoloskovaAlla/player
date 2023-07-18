import { useSelector } from 'react-redux';
import { fetchHomePageData } from 'store/slices/homePageSlice';

/**  
 * @returns {object}
 */

export const useHomePage = () => {
  const {
    isLoading,
    homePageData,
    errorMessage
  } = useSelector((state) => state.homePageReducer);

  return {
    fetchHomePageData,
    isLoading,
    homePageData,
    errorMessage,
  };
};

