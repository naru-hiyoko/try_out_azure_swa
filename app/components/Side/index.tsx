import { ReactElement, useContext, useEffect } from 'react';
import { DemoContext } from '../../pages/home';

export const Side = (): ReactElemet => {
  const {state, dispatch} = useContext(DemoContext);

  return (
    <div>
      hello
      <button onClick={() => dispatch({'type': 'increment'})} > other + </button>
    </div>
  );
};
