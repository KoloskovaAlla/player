import { useButton } from 'hooks';
import { useDispatch } from 'react-redux';
import { ReactComponent as IconWa } from './assets/wa.svg';
import { useEffect } from 'react';

export const ButtonMain = () => {
  const dispatch = useDispatch();
  const { fetchButtonData, buttonData } = useButton();

  useEffect(() => {
    dispatch(fetchButtonData());
  }, [dispatch, fetchButtonData]);

  return (
    <a className='btn-main' href={buttonData?.url}>
      <IconWa />
      <span>{buttonData?.content}</span>
    </a>
  );
};
