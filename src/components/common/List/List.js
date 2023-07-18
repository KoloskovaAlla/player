import ListItem from './components/ListItem';

const List = ({ parentClassName, list }) => {

  const className = parentClassName
    ? `${parentClassName}__list`
    : 'list';

  return (
    <ul className={className}>
      {list.map((item, index) => (
        <ListItem
          key={index}
          parentClassName={parentClassName}
        >
          {item}
        </ListItem>
      ))}
    </ul>
  );
};

export default List;