import { useRef } from 'react';
import useAnimateRef from '../../../../../hooks/useAnimateRef';

const Client = ({ parentClassName, client }) => {

  const clientRef = useRef(null);

  useAnimateRef(clientRef);

  return (
    <img
      className={`${parentClassName}__image`}
      ref={clientRef}
      src={client?.source}
      alt={client?.alternate}
    />
  );
};

export default Client;