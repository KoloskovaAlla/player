import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import { Navigation } from 'swiper';

import { useModal, useCurrentPodcast, usePodcasts } from 'hooks';
import { Player } from 'components/layout/ModalPlayer/components/Player';
import { throttle } from 'utils/helpers';
import { IconPrev, IconNext, IconClose } from './assets';
import { classNames } from 'utils/helpers';

import classes from './ModalPlayer.module.scss';

export const ModalPlayer = () => {
  const dispatch = useDispatch();
  
  // Используем хук useModal для получения функции setIsModalOpen
  const { setIsModalOpen } = useModal();
  
  // Используем хук usePodcasts для получения данных о подкастах
  const { podcastsData: podcasts } = usePodcasts();
  
  // Используем хук useCurrentPodcast для получения текущего id и функций setId и setPodcast
  const { id, setId, setPodcast } = useCurrentPodcast();
  
  // Вычисляем общее количество подкастов
  const length = Object.keys(podcasts).length;

  // Состояние для отслеживания изменения размера окна браузера
  const [resize, setResize] = useState(false);
  
  // Получаем ширину окна браузера
  const windowWidth = window.innerWidth;

  // Обработчик изменения размера окна браузера
  const handleWindowResize = () => {
    setResize(!resize);
  };

  // Оптимизируем обработчик, чтобы не вызывать его слишком часто
  const optimizedHandler = throttle(handleWindowResize, 250);

  // Переменная для номера текущего 
  const [initialSlide, setInitialSlide] = useState(id - 1);

  // Обработчик закрытия модального окна
  const handleCloseClick = () => {
    dispatch(setIsModalOpen(false));
  };

  // Обработчик клика на модальном окне (закрытие при клике вне модального окна)
  const handleModalClick = (event) => {
    event.stopPropagation();
    handleCloseClick();
  };

  // Обработчик клика внутри модального окна (предотвращение всплытия события)
  const handleBodyClick = (event) => {
    event.stopPropagation();
  };

  // Обработчик смены слайдов в Swiper
  const handleSlideChange = (event) => {
    const activeIndex = event.activeIndex;
    // Вычисляем новый id на основе активного слайда
    const newId = id + (id - 1 === activeIndex ? 0 : activeIndex + 1 - id);
    const podcast = podcasts[`podcast${newId}`];
    dispatch(setId(newId));
    dispatch(setPodcast(podcast));
  };

  // Состояния для отключения кнопок "Предыдущий" и "Следующий"
  const [isPrevDisabled, setIsPrevDisabled] = useState(false);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  // Проверяем, нужно ли отключить кнопку "Предыдущий" или "Следующий"
  useEffect(() => {
    setIsPrevDisabled(id === 1);
    setIsNextDisabled(id === length);
  }, [id, length]);

  // Обновляем начальный слайд при изменении id
  useEffect(() => {
    setInitialSlide(id - 1);
  }, [id]);

  // Состояния для отслеживания действий с плеером (перемотка, изменение громкости)
  const [isSeeking, setIsSeeking] = useState(false);
  const [isChangingVolume, setIsChangingVolume] = useState(false);

  // Состояние для разрешения смены слайдов
  const [allowChangeSlide, setAllowChangeSlide] = useState(true);

  // Проверяем, можно ли менять слайды в данный момент
  useEffect(() => {
    setAllowChangeSlide(!isSeeking && !isChangingVolume);
  }, [isSeeking, isChangingVolume]);

  // Генерируем классы для кнопок "Предыдущий" и "Следующий"
  const prevClassNames = classNames(classes.prev, {
    [classes.disablePrev]: isPrevDisabled,
  });

  const nextClassNames = classNames(classes.next, {
    [classes.disableNext]: isNextDisabled,
  });

  // Изменяем ширину Swiper при изменении размера окна
  useEffect(() => {
    if (!swiperRef.current) return;
    swiperRef.current.style.width = `${windowWidth - 30}px`;
  }, [resize, windowWidth]);

  // Рефы для навигационных кнопок и Swiper
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const swiperRef = useRef(null);

  // Добавляем обработчик события изменения размера окна
  useEffect(() => {
    window.addEventListener('resize', optimizedHandler);
    // Удаляем обработчик события при размонтировании компонента
    return () => {
      window.removeEventListener('resize', optimizedHandler);
    };
  }, [optimizedHandler]);

  return (
    <div onClick={handleModalClick} className={classes.modal}>
      <div onClick={handleBodyClick} ref={swiperRef} className={classes.wrapper}>
        <div className={classes.close}>
          <button onClick={handleCloseClick}>
            <IconClose className={classes.play} />
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
          <button ref={navigationPrevRef} className={prevClassNames} disabled={isPrevDisabled}>
            <IconPrev />
          </button>
          <button ref={navigationNextRef} className={nextClassNames} disabled={isNextDisabled}>
            <IconNext />
          </button>
        </Swiper>
      </div>
    </div>
  );
};
