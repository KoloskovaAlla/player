import { useDispatch } from 'react-redux';
import { API_BASE_URL } from 'constants/api';
import { useData } from 'hooks';
import { useContext, useEffect } from 'react';
import SliderContext from 'contexts/SliderContext';
import Preloader from 'components/layout/Preloader';
import SectionBase from 'components/layout/SectionBase';

export const CardsPage = () => {
  const dispatch = useDispatch();
  const { fetchData, isLoading, data } = useData();
  const { setSlides } = useContext(SliderContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSlides([]);
    dispatch(fetchData(`${API_BASE_URL}/cardspage/.json`));
  }, [setSlides, dispatch, fetchData]);

  return (
    <>
      {isLoading && <Preloader />}

      {data?.cards && <SectionBase data={data.cards} reverse />}
    </>
  );
};
