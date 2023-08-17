import { useHomePage } from 'hooks';
import { useDispatch } from 'react-redux';
import { useContext, useEffect, useState, useRef } from 'react';
import SliderContext from 'contexts/SliderContext';
import { Link } from 'react-router-dom';
import classes from './HomePage.module.scss'

export const HomePage = () => {
  const buttonRef = useRef(null);
  const [isHover, setIsHover] = useState(false);
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

  // const handleMouseEnter = () => {
  //   setIsHover(true);
  //   console.log(buttonRef.current.style);
  //   console.log('test');
  // };

  const handleMouseEnter = () => {
    setIsHover(true);
    buttonRef.current.style.scale = '1.2';
    buttonRef.current.style.background = 'rgb(249, 167, 137)';
    buttonRef.current.style.transitionProperty = 'all';
    buttonRef.current.style.transitionDuration = '1s';
  };

  const handleMouseLeave = () => {
    setIsHover(false);
    buttonRef.current.style.scale = '1';
    buttonRef.current.style.transitionProperty = 'all';
    buttonRef.current.style.background = 'rgb(244, 116, 69)';
  };

  if (homePageData) return (
    <main>
      <div className={classes.wrapper}>
        {homePageData?.title?.content && <h1>{homePageData.title.content}</h1>}
        <Link
          to={`/podcasts`}
          className={classes.button}
          onMouseOver={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          ref={buttonRef}
        >
          {homePageData.buttonText}
        </Link>
      </div>
    </main>
  );
};
