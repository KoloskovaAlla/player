import { memo, useRef } from 'react';
import { useAnimateRef } from 'hooks';
import Title from 'components/common/Title';
import Text from 'components/common/Text';
import Link from 'components/common/Link';
import Preview from 'components/common/Preview';
import clsx from 'clsx';

const SectionBase = memo(({ data, reverse }) => {
  const { name, title, texts, links, image } = data;
  const linkRef = useRef(null);
  useAnimateRef(linkRef);

  const className = 'section-base';
  const classNames = clsx(className, { 'reverse': !!reverse });

  return (
    <section className={classNames} id={name}>
      <div className={`${className}__wrapper`}>

        {image && <Preview image={image} />}

        <div className={`${className}__body`}>

          {title?.content && (
            <Title
              priority={title.priority}
              parentClassName={className}
            >
              {title.content}
            </Title>
          )}

          {texts?.length > 0 && texts.map((text) => (
            <Text
              key={text}
              parentClassName={className}
            >
              {text}
            </Text>
          ))}

          {links?.length > 0 && links.map((link, index) => (
            <Link
              key={index}
              parentClassName={className}
              url={link.url}
            >
              {link.content}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
});

export default SectionBase;