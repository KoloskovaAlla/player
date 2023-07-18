import { useSelector } from 'react-redux';
import { fetchButtonData } from 'store/slices/buttonSlice';

/**  
 * @returns {object}
 */

export const useButton = () => {
  const {
    isLoading,
    buttonData,
    errorMessage
  } = useSelector((state) => state.buttonReducer);

  return {
    fetchButtonData,
    isLoading,
    buttonData,
    errorMessage,
  };
};
