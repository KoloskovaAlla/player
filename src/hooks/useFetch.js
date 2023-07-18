import { useState, useCallback } from 'react';

const useFetch = (baseURL) => {

  const [isDataLoading, setIsDataLoading] = useState(false);

  const getData = useCallback((endPoint) => {

    setIsDataLoading(true);

    return new Promise((resolve, reject) => {
      fetch(baseURL + endPoint)
        .then((response) => response.json())
        .then((data) => {
          if (!data) {
            return reject(data);
          }
          resolve(data);
        })
        .catch((error) => console.error(error))
        .finally(() => setIsDataLoading(false));
    });
  }, [baseURL]);

  const postData = useCallback((endPoint, body) => {

    setIsDataLoading(true);

    return new Promise((resolve, reject) => {
      fetch(baseURL + endPoint, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data) {
            return reject(data);
          }
          resolve(data);
        })
        .catch((error) => console.error({ error }))
        .finally(() => setIsDataLoading(false));
    });
  }, [baseURL]);

  return { getData, postData, isDataLoading };
};

export default useFetch;