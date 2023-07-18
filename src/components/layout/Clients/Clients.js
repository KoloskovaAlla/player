import { memo } from 'react';
import useLang from '../../../hooks/useLang';
import useTheme from '../../../hooks/useTheme';
import Client from './components/Client';

const Clients = memo(({ data }) => {

  const { lang } = useLang();
  const { theme } = useTheme();

  const { name, ligthThemeClients, darkThemeClients } = data;

  const className = 'clients';

  const clients = theme === 'dark'
    ? darkThemeClients
    : ligthThemeClients;

  return (
    <section className={className} id={name}>
      <div className={`${className}__wrapper`}>

        <h2 style={{ display: 'none' }}>
          {lang === 'en' ? 'Clients' : 'Клиенты'}
        </h2>

        {clients?.length > 0 && clients.map((client, index) => (
          <Client
            key={index}
            parentClassName={className}
            client={client}
          />
        ))}

      </div>
    </section>
  );
});

export default Clients;