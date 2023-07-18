import { useHomePage } from 'hooks';
import { useDispatch } from 'react-redux';
import { useContext, useEffect } from 'react';
import SliderContext from 'contexts/SliderContext';
import SectionBase from 'components/layout/SectionBase';
import SectionList from './components/SectionList';
import Preloader from 'components/layout/Preloader';

export const HomePage = () => {
  const dispatch = useDispatch();
  const { fetchHomePageData, homePageData, isLoading } = useHomePage();
  const { setSlides } = useContext(SliderContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setSlides([]);
    dispatch(fetchHomePageData());
  }, [dispatch, fetchHomePageData, setSlides]);

  return (
    <>
      {isLoading && <Preloader />}

      {homePageData?.about && <SectionBase data={homePageData.about} />}

      {homePageData?.problems && <SectionList data={homePageData.problems} reverse />}

      {homePageData?.services && <SectionList data={homePageData.services} />}

      {homePageData?.steps && <SectionBase data={homePageData.steps} reverse />}

      {homePageData?.techniques && <SectionList data={homePageData.techniques} />}

      {homePageData?.resolve && <SectionBase data={homePageData.resolve} reverse />}
    </>
  );
};
