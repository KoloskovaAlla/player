import Title from 'components/common/Title';
import Accordeon from './components/Accordeon';

const SectionAcc = ({ data }) => {

  const { name, title, list } = data;
  const className = 'section-acc';

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

        {list.length > 0 && <Accordeon list={list} />}

      </div>
    </section>
  );
};

export default SectionAcc;