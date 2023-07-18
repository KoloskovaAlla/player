import { memo } from 'react';
import Column from './components/Column';
import Info from './components/Info';

const Footer = memo(({ data }) => {

  const { name, columns, info } = data;

  const className = 'footer';

  return (
    <footer className={className} id={name}>
      <div className={`${className}__wrapper`}>
        <div className={`${className}__columns`}>
          {columns?.length > 0 && columns.map((column, index) => (
            <Column
              key={index}
              parentClassName={className}
              data={column}
            />
          ))}
        </div>

        {info && (
          <Info
            parentClassName={className}
            data={info}
          />
        )}
      </div>
    </footer>
  );
});

export default Footer;