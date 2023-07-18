import { useSelector } from 'react-redux';
import { fetchData } from 'store/slices/actionCreators';

export const useData = () => {
  const { isLoading, data } = useSelector((store) => store.dataReducer);
  return { fetchData, isLoading, data };
};
