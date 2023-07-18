import { useState, useEffect } from 'react';
import PreviewContext from '../contexts/PreviewContext';

export const PreviewProvider = ({ children }) => {
  const [previewDetails, setPreviewDetails] = useState(null);

  useEffect(() => {
    previewDetails
      ? document.body.classList.add('no_scroll')
      : document.body.classList.remove('no_scroll');
  }, [previewDetails]);

  const value = {
    previewDetails,
    setPreviewDetails
  };

  return (
    <PreviewContext.Provider value={value}>
      {children}
    </PreviewContext.Provider>
  );
};
