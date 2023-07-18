import { memo, useRef, useEffect } from 'react';
import { showProgress } from '../../../utils/helpers';

export const Progress = memo(() => {

  const progressRef = useRef(null);

  useEffect(() => {
    const handleWindowScroll = () => {
      showProgress(progressRef);
    };

    window.addEventListener('scroll', handleWindowScroll);
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, [progressRef]);

  return (
    <progress
      className='progress'
      ref={progressRef}
      max='100'
      value='0'
    ></progress>
  );
});
