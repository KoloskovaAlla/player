import { useDispatch, useSelector } from 'react-redux';
import { useContext, useEffect } from 'react';
import { fetchData } from 'store/slices/actionCreators';
import { API_BASE_URL } from 'constants/api';
import SliderContext from 'contexts/SliderContext';
import SectionBase from 'components/layout/SectionBase';
import SectionList from 'components/layout/SectionList';
import Preloader from 'components/layout/Preloader/Preloader.js';
import { PodcastsSection } from 'components/layout/PodcastsSection';
import { ModalPlayer } from 'components/layout/ModalPlayer';
import { useModal } from 'hooks';

export const AboutPage = () => {
  const dispatch = useDispatch();
  const { setSlides } = useContext(SliderContext);
  const { data, isLoading } = useSelector((state) => state.dataReducer);
  const { isModalOpen } = useModal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setSlides([]);
    dispatch(fetchData(`${API_BASE_URL}/aboutpage/.json`));
  }, [setSlides, dispatch]);

  return (
    <>
      {isLoading && <Preloader />}

      {data?.about && <SectionBase data={data.about} />}

      {data?.about2 && <SectionBase data={data.about2} reverse />}

      {data?.services && <SectionList data={data.services} />}

      {data?.services2 && <SectionBase data={data.services2} />}

      {data?.consultations && <SectionBase data={data.consultations} reverse />}

      {data?.meditations && <SectionBase data={data.meditations} reverse />}

      {isModalOpen && <ModalPlayer />}
    </>
  );
};
