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
    setSlides([]);
    dispatch(fetchHomePageData());
  }, [dispatch, fetchHomePageData, setSlides]);

  return (
    <div>
      <h1>Podcasts App</h1>
      <Link
        to={`/podcasts`}
        className={classes.button}
      >
        Podcasts
      </Link>
    </div>
  );
};
