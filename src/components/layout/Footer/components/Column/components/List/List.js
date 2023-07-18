import Item from './components/Item';

const List = ({ parentClassName, list }) => {

  return (
    <ul className={`${parentClassName}__list`}>
      {list.map((item, index) => (
        <Item
          key={index}
          parentClassName={parentClassName}
          item={item}
        />
      ))}
    </ul>
  );
};

export default List;