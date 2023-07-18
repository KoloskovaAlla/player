import { useSelector } from 'react-redux';
import { fetchHeaderData } from 'store/slices/headerSlice';

/**  
 * @returns {object}
 */

export const useHeader = () => {
  const {
    isLoading,
    headerData,
    errorMessage
  } = useSelector((state) => state.headerReducer); 

  return {
    fetchHeaderData,
    isLoading,
    headerData,
    errorMessage,
  };
};
