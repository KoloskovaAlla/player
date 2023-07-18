import { setIsModalActive, setIsModalOpen } from 'store/slices/modalSlice';
import { useSelector } from 'react-redux';

export const useModal = () => {
  const { isModalActive, isModalOpen } = useSelector((state) => state.modalReducer);

  return {
    isModalActive,
    setIsModalActive,
    isModalOpen,
    setIsModalOpen,
  };
};
