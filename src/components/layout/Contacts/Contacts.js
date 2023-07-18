import { memo, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useContacts, useAnimateRef } from 'hooks';
import Title from 'components/common/Title';
import Text from 'components/common/Text';
import clsx from 'clsx';

export const Contacts = memo(({ reverse }) => {
  const dispatch = useDispatch();
  const linkRef = useRef(null);
  useAnimateRef(linkRef);

  const className = 'section-base';
  const classNames = clsx(className, { 'reverse': !!reverse });

  const {
    fetchContactsData,
    contactsData: data,
  } = useContacts();

  useEffect(() => {
    dispatch(fetchContactsData());
  }, [dispatch, fetchContactsData]);

  return (
    <section className={classNames} id={data?.name}>
      <div className={`${className}__wrapper`}>
        <div>
          <img
            src={data?.image.source}
            alt={data?.image.alternate}
          />
        </div>

        <div className={`${className}__body`}>
          {data?.title.content && (
            <Title
              priority={data.title.priority}
              parentClassName={className}
            >
              {data.title.content}
            </Title>
          )}

          {data?.texts.length > 0 && data.texts.map((text) => (
            <Text
              key={text}
              parentClassName={className}
            >
              {text}
            </Text>
          ))}
        </div>
      </div>
    </section>
  );
});
