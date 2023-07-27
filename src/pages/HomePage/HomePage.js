import { useHomePage } from 'hooks';
import { useDispatch } from 'react-redux';
import { useContext, useEffect } from 'react';
import SliderContext from 'contexts/SliderContext';
import SectionBase from 'components/layout/SectionBase';
import SectionList from './components/SectionList';
import Preloader from 'components/layout/Preloader';
import { Link } from 'react-router-dom';
import classes from './HomePage.module.scss'

export const HomePage = () => {
  const dispatch = useDispatch();
  const { fetchHomePageData, homePageData, isLoading } = useHomePage();
  const { setSlides } = useContext(SliderContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (homePageData) console.log(homePageData);
  }, [homePageData]);

  useEffect(() => {
    setSlides([]);
    dispatch(fetchHomePageData());
  }, [dispatch, fetchHomePageData, setSlides]);

  if (homePageData) return (
    <main>
      <div className={classes.wrapper}>
        {homePageData?.title?.content && <h1>{homePageData.title.content}</h1>}
        <Link
          to={`/podcasts`}
          className={classes.button}
        >
          {homePageData.buttonText}
        </Link>
      </div>
    </main>
  );
};
