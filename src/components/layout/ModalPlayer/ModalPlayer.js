import { useModal, useCurrentPodcast, usePodcasts } from 'hooks';
import { useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css'; // Импорт стилей
import { Navigation } from 'swiper';
import { throttle } from 'utils/helpers';
import { Player } from 'components/layout/ModalPlayer/components/Player';
import { ReactComponent as IconPrev } from './assets/arrow_drop_left.svg';
import { ReactComponent as IconNext } from './assets/arrow_drop_right.svg';
import { ReactComponent as IconClose } from './assets/dell.svg';
import classes from './ModalPlayer.module.scss';
import { setPodcast } from 'store/slices/currentPodcastSlice';

export const ModalPlayer = () => {
  const dispatch = useDispatch();

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const swiperRef = useRef(null);

  const { podcastsData: podcasts } = usePodcasts();
  const { id, setId } = useCurrentPodcast();
  const { setIsModalOpen } = useModal();

  const [initialSlide, setInitialSlide] = useState(id - 1);
  const [resize, setResize] = useState(false);

  const length = Object.keys(podcasts).length;
  const windowWidth = window.innerWidth;

  const handleWindowResize = () => {
    resize ? setResize(false) : setResize(true);
  };
  const optimizedHandler = throttle(handleWindowResize, 250);
  window.addEventListener('resize', optimizedHandler);

  if (swiperRef.current) swiperRef.current.style.width = `${windowWidth - 30}px`;

  useEffect(() => {
    if (!swiperRef.current) return;
    if (swiperRef.current) swiperRef.current.style.width = `${windowWidth - 30}px`;
  }, [resize, windowWidth]);

  const handleCloseClick = () => {
    dispatch(setIsModalOpen(false));
  };

  const handleModalClick = () => {
    dispatch(setIsModalOpen(false));
  }

  const handleBodyClick = (event) => {
    event.stopPropagation();
  };

  const handleSlideChange = (event) => {
    if (id - 1 === event.activeIndex) return;

    if (id - 1 < event.activeIndex) {
      dispatch(setId(id + 1));
      const podcast = podcasts[`podcast${id + 1}`];
      dispatch(setPodcast(podcast));
    }

    else {
      dispatch(setId(id - 1));
      const podcast = podcasts[`podcast${id - 1}`];
      dispatch(setPodcast(podcast));
    };
  };

  const handleButtonPrevClick = () => {
    if (id === 1) return;
  };

  const handleButtonNextClick = () => {
    if (id === length) return;
  };

  useEffect(() => {
    setInitialSlide(initialSlide - 1);
  }, [id]);

  const [isSeeking, setIsSeeking] = useState(false);
  const [isChangingVolume, setIsChangingVolume] = useState(false);

  const [allowChangeSlide, setAllowChangeSlide] = useState(false);

  useEffect(() => {
    setAllowChangeSlide(!isSeeking && isChangingVolume);
  }, [isSeeking, setIsSeeking]);

  if (podcasts) return (
    <div
      onClick={handleModalClick}
      className={classes.modal}
    >
      <div
        onClick={handleBodyClick}
        ref={swiperRef}
        className={classes.wrapper}
      >
        <div className={classes.close}>
          <button>
            <IconClose
              onClick={handleCloseClick}
              className={classes.play}
            />
          </button>
        </div>
        <Swiper
          ref={swiperRef}
          className={classes.mySwiper}
          modules={[Navigation]}
          slidesPerView={1}
          onSlideChange={handleSlideChange}
          navigation={{
            nextEl: navigationNextRef.current,
            prevEl: navigationPrevRef.current,
          }}
          initialSlide={initialSlide}
          allowSlidePrev={allowChangeSlide}
          allowSlideNext={allowChangeSlide}
        >
          {Object.values(podcasts).map((podcast, index) => (
            <SwiperSlide key={index}>
              {podcast.id === id && <Player setIsSeeking={setIsSeeking} setIsChangingVolume={setIsChangingVolume} />}
            </SwiperSlide>
          ))}
          <button
            onClick={handleButtonPrevClick}
            ref={navigationPrevRef}
            className={classes.prev}
          >
            <IconPrev />
          </button>
          <button
            onClick={handleButtonNextClick}
            ref={navigationNextRef}
            className={classes.next}
          >
            <IconNext />
          </button>
        </Swiper>
      </div>
    </div>
  );
};