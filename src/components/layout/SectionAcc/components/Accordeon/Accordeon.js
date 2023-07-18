import AccItem from './components/AccItem';

const Accordeon = ({ list }) => {

  const className = 'accordeon';

  return (
    <ul className={className}>
      {list.map((item) => (
        <AccItem
          key={item.id}
          parentClassName={className}
          item={item}
        />
      ))}
    </ul>
  );
};

export default Accordeon;