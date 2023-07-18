import { memo } from 'react';
import { ReactComponent as LogoIcon } from './assets/logo.svg';
import { Link } from 'react-router-dom';

const Logo = memo(({ parentClassName, onLogoClick }) => {

  const className = parentClassName
    ? `${parentClassName}__logo`
    : 'logo';

  return (
    <Link
      to={`/`}
      className={className}
    >
      <LogoIcon />
    </Link>
  );
});

export default Logo;