import Title from 'components/common/Title';
import List from 'components/common/List';

const SectionList = ({ data }) => {

  const { name, title, list } = data;

  const className = 'section-list';

  return (
    <section className={className} id={name}>
      <div className={`${className}__wrapper`}>

        {title?.content && (
          <Title
            priority={title.priority}
            parentClassName={className}
          >
            {title.content}
          </Title>
        )}

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