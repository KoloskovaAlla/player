import { usePodcasts } from 'hooks';
import { useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { PodcastPreview } from './components/PodcastPreview';
import classes from './Slider.module.scss';
import { throttle } from 'utils/helpers';

export const Slider = () => {
  const windowWidth = window.innerWidth;
  const dispatch = useDispatch();
  const { fetchPodcastsData, podcastsData: podcasts } = usePodcasts();

  useEffect(() => { dispatch(fetchPodcastsData()) }, [dispatch, fetchPodcastsData]);

  const swiperRef = useRef(null);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(null);
  const [swiper, setSwiper] = useState(null);
  const [isPodcastsHover, setIsPodcastsHover] = useState(null);

  useEffect(() => {
    if (!swiper) return;
    if (!isPodcastsHover) {
      navigationPrevRef.current.style.display = 'none';
      navigationNextRef.current.style.display = 'none';
    } else {
      if (swiper.isBeginning && navigationPrevRef.current) {
        navigationPrevRef.current.style.display = 'none';
      }
      if (!swiper.isBeginning && navigationPrevRef.current) {
        navigationPrevRef.current.style.display = 'block';
      }

      if (swiper.isEnd && navigationNextRef.current) {
        navigationNextRef.current.style.display = 'none';
      }
      if (!swiper.isEnd && navigationNextRef.current) {
        navigationNextRef.current.style.display = 'block';
      }
    }
  }, [activeIndex, swiper, isPodcastsHover]);

  const handleSwiper = (swiper) => {
    setActiveIndex(swiper.activeIndex);
    setSwiper(swiper);
  }

  const handleSlideChange = () => {
    setActiveIndex(swiper.activeIndex);
  }

  const handleMouseLeave = () => {
    setIsPodcastsHover(false);
  }

  const [resize, setResize] = useState(false);
  const handleWindowResize = () => {
    resize ? setResize(false) : setResize(true);
  }
  const optimizedHandler = throttle(handleWindowResize, 250);
  window.addEventListener('resize', optimizedHandler);

  if (swiperRef.current) swiperRef.current.style.width = `${windowWidth - 30}px`;

  useEffect(() => {
    if (!swiperRef.current) return;
    if (swiperRef.current) swiperRef.current.style.width = `${windowWidth - 30}px`;
  }, [resize, windowWidth]);

  if (podcasts) {
    return (
      <div
        className={classes.wrapper}
        ref={swiperRef}
        onMouseEnter={() => { setIsPodcastsHover(true) }}
        onMouseLeave={handleMouseLeave}
      >
        <Swiper
          className={classes.mySwiper}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={30}
          slidesPerView={1.3}
          breakpoints={{
            770: {
              slidesPerView: 3
            },
            1150: {
              slidesPerView: 4
            },
            1440: {
              slidesPerView: 4
            }
          }}
          navigation={{
            nextEl: navigationNextRef.current,
            prevEl: navigationPrevRef.current,
          }}
          pagination={
            { type: 'fraction' }
          }
          onSwiper={handleSwiper}
          onSlideChange={handleSlideChange}
        >
          {Object.values(podcasts).map((podcast, index) => (
            <SwiperSlide key={index}>
              <PodcastPreview podcast={podcast} />
            </SwiperSlide>
          ))}
          <button className={classes.swiper_button_prev_custom} ref={navigationPrevRef}></button>
          <button className={classes.swiper_button_next_custom} ref={navigationNextRef}></button>
        </Swiper>
      </div >
    );
  };
};
