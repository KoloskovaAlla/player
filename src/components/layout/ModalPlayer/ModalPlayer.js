import classes from './ModalPlayer.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import { useModal, useCurrentPodcast, usePodcasts } from 'hooks';
import { Player } from 'components/layout/ModalPlayer/components/Player';
import { throttle } from 'utils/helpers';
import { IconPrev, IconNext, IconClose } from './assets';
import { classNames } from 'utils/helpers';

export const ModalPlayer = () => {
  const dispatch = useDispatch();

  const [resize, setResize] = useState(false);
  const windowWidth = window.innerWidth;
  const handleWindowResize = () => {
    resize ? setResize(false) : setResize(true);
  };
  const optimizedHandler = throttle(handleWindowResize, 250);

  const { setIsModalOpen } = useModal();
  const { podcastsData: podcasts } = usePodcasts();
  const length = Object.keys(podcasts).length;

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const swiperRef = useRef(null);

  const { id, setId, setPodcast } = useCurrentPodcast();
  const [initialSlide, setInitialSlide] = useState(id - 1);

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

  // const handleButtonPrevClick = () => {
  //   if (id === 1) return;
  // };

  // const handleButtonNextClick = () => {
  //   if (id === length) return;
  // };

  // const isPrevDisabled = id === 1; 
  // const isNextDisabled = id === length;
  const [isPrevDisabled, setIsPrevDisabled] = useState(false);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  useEffect(() => {
    if (id === 1) setIsPrevDisabled(true); else  setIsPrevDisabled(false);
    if (id === length) setIsNextDisabled(true); else setIsNextDisabled(false);
  }, [id, length]);

  useEffect(() => {
    setInitialSlide(initialSlide - 1);
  }, [id]);

  const [isSeeking, setIsSeeking] = useState(false);
  const [isChangingVolume, setIsChangingVolume] = useState(false);

  const [allowChangeSlide, setAllowChangeSlide] = useState(true);

  useEffect(() => {
    setAllowChangeSlide(!isSeeking && !isChangingVolume);
  }, [isSeeking, isChangingVolume]);

  const prevClassNames = classNames(classes.prev, {
    [classes.disablePrev]: isPrevDisabled,
  });

  const nextClassNames = classNames(classes.next, {
    [classes.disableNext]: isNextDisabled,
  });


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
          speed={0}
        >
          {Object.values(podcasts).map((podcast, index) => (
            <SwiperSlide key={index}>
              {podcast.id === id && (
                <Player
                  setIsSeeking={setIsSeeking}
                  setIsChangingVolume={setIsChangingVolume}
                  isChangingVolume={isChangingVolume}
                />
              )}
            </SwiperSlide>
          ))}
          <button
            // onClick={handleButtonPrevClick}
            ref={navigationPrevRef}
            className={prevClassNames}
            disabled={isPrevDisabled}
          >
            <IconPrev />
          </button>
          <button
            // onClick={handleButtonNextClick}
            ref={navigationNextRef}
            className={nextClassNames}
            disabled={isNextDisabled}
          >
            <IconNext />
          </button>
        </Swiper>
      </div>
    </div>
  );
};