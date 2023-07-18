import { useState, useEffect, useRef } from 'react';
import useAnimateRef from '../../../../../hooks/useAnimateRef';
import { ReactComponent as LogoIcon } from './assets/logo.svg';
import Text from '../../../../common/Text/Text';
import { scrollToTop } from '../../../../../utils/helpers';

const Info = ({ parentClassName, data }) => {

  const { texts, developer } = data;
  const [isLogoCliked, setIsLogoCliked] = useState(false);

  const logoRef = useRef(null);
  const developerRef = useRef(null);

  useAnimateRef(logoRef);
  useAnimateRef(developerRef);

  useEffect(() => {
    if (isLogoCliked) {
      scrollToTop();
      setIsLogoCliked(false);
    }
  }, [isLogoCliked]);

  const handleLogoClick = () => {
    setIsLogoCliked(true);
  };

  return (
    <div className={`${parentClassName}__info`}>

      <button
        className={`${parentClassName}__logo`}
        ref={logoRef}
        onClick={handleLogoClick}
      >
        <LogoIcon />
      </button>

      {texts?.length > 0 && texts.map((text) => (
        <Text
          parentClassName={parentClassName}
          key={text}
        >
          {text}
        </Text>
      ))}

      {developer && (
        <a
          className={`${parentClassName}__developer`}
          ref={developerRef}
          href={developer.url}
          title='nagoraproweb.ru'
        >
          <img
            src={developer.content.source}
            alt={developer.content.alternate}
          />
        </a>
      )}
    </div>
  );
};

export default Info;