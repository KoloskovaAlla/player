import { useState, useEffect } from 'react';

const useAnimatePrint = (ref) => {
  const [text, setText] = useState('');
  const [stringMaxWidth, setStringMaxWidth] = useState(0);

  useEffect(() => {
    if (!text || !ref.current) return;

    let index = 0;
    let string = '';
    let timerID = null;
    let stringMode = 'first';
    let refChild = null;

    const printString = () => {
      if (!ref.current) return;

      refChild.classList.remove('cursor-blink');
      refChild.classList.add('cursor');

      if (index < text.length) {
        string += text[index];
        refChild.textContent = string;
        index++;
        const refChildWidth = refChild.getBoundingClientRect().width;

        if (refChildWidth >= stringMaxWidth - 70 && text[index] === ' ') {
          stringMode = 'next';
          checkMode();
        } else {
          timerID = setTimeout(printString, 100);
        }
      } else {
        refChild.classList.remove('cursor');
        refChild.classList.add('cursor-blink');
        clearTimeout(timerID);
      }
    };

    const printFirstString = () => {
      refChild = document.createElement('span');
      ref.current.innerHTML = '';
      ref.current.append(refChild);

      printString();
    };

    const printNextString = () => {
      refChild.classList.remove('cursor');
      refChild = document.createElement('span');
      ref.current.append(refChild);

      string = '';

      printString();
    };

    const checkMode = () => {
      if (stringMode === 'first') {
        printFirstString();
      }

      if (stringMode === 'next') {
        printNextString();
      }
    };

    checkMode();

  }, [ref, text, stringMaxWidth]);

  const animatePrint = (text, stringMaxWidth) => {
    setText(text);
    setStringMaxWidth(stringMaxWidth);
  };

  return { animatePrint };
};

export default useAnimatePrint;