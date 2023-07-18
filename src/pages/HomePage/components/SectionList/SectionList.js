import Title from 'components/common/Title';
import List from 'components/common/List';
import Text from 'components/common/Text';
import Preview from 'components/common/Preview';
import clsx from 'clsx';

const SectionList = ({ data, reverse }) => {

  const { name, title, list, texts, image } = data;

  const className = 'section-list';
  const classNames = clsx(className, { 'reverse': !!reverse });

  return (
    <section className={classNames} id={name}>
      <div className={`${className}__wrapper`}>

        <div className={`${className}__information`}>
          <div className={`${className}__body`}>
            {title?.visibility && title?.content && (
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
          </div>

          {image && <Preview image={image} />}
        </div>

        {list.length > 0 && (
          <List
            parentClassName={className}
            list={list}
          />
        )}
      </div>
    </section>
  );
};

export default SectionList;