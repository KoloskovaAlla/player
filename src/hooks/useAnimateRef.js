import { useMemo, useCallback, useEffect } from 'react';

export const useAnimateRef = (ref) => {

  const callback = useCallback((entries) => {
    if (!ref.current) return;

    const [entry] = entries;
    const { isIntersecting } = entry;

    if (isIntersecting) {
      ref.current.classList.add('on');
      ref.current.classList.remove('off');
    } else {
      ref.current.classList.add('off');
      ref.current.classList.remove('on');
    }
  }, [ref]);

  const options = useMemo(() => ({
    root: null,
    rootMargin: '0px 0px -20px 0px',
    treshold: 0
  }), []);

  useEffect(() => {
    if (!ref.current) return;

    const target = ref.current;
    const observer = new IntersectionObserver(callback, options);
    observer.observe(target);

    return () => observer.unobserve(target);
  }, [ref, callback, options]);
};
