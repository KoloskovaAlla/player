import { useSelector } from 'react-redux';
import { fetchContactsData } from 'store/slices/contactsSlice';

export const useContacts = () => {
  const {
    isLoading,
    contactsData,
    errorMessage
  } = useSelector((state) => state.contactsReducer); 

  return {
    fetchContactsData,
    isLoading,
    contactsData,
    errorMessage,
  };
}