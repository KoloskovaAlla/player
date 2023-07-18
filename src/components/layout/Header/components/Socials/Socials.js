import { ReactComponent as IconTlg } from './assets/tlg.svg';
import { ReactComponent as IconVk } from './assets/vk.svg';

const icons = {
  'telegram': <IconTlg />,
  'vkontakte': <IconVk />
};

const Socials = ({ parentClassName, socials }) => {
  const className = parentClassName
    ? `${parentClassName}__socials`
    : 'socials';

  return (
    <div className={className}>
      {socials.length > 0 && socials.map((social, index) => (
        <a
          key={index}
          href={social.url}
          target='_blank'
          rel='noreferrer'
        >
          {icons[social.name]}
        </a>
      ))}
    </div>
  );
};

export default Socials;