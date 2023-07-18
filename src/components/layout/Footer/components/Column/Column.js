import Title from '../../../../common/Title';
import List from './components/List';

const Column = ({ parentClassName, data }) => {

  if (!Object.keys(data).length) return null;

  const { title, links } = data;

  return (
    <div className={`${parentClassName}__column`}>
      {title?.content && (
        <Title
          parentClassName={parentClassName}
          priority={title.priority}
        >
          {title.content}
        </Title>
      )}

      {links?.length > 0 && (
        <List
          parentClassName={parentClassName}
          list={links}
        />
      )}
    </div>
  );
};

export default Column;