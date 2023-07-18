import { dataFetching, dataFetchingSuccess, dataFetchingError } from './dataSlice';

export const fetchData = (url) => async (dispatch) => {
  try {
    dispatch(dataFetching());
    const response = await fetch(url);
    const data = await response.json();
    dispatch(dataFetchingSuccess(data));
  } catch (error) {
    dispatch(dataFetchingError(error.message));
  }
};