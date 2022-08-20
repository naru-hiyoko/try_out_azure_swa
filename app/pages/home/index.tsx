import { useEffect, useReducer, createContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { connect, Provider } from 'react-redux'

import { Side } from '../../components/Side'

const initialState = {count: 0, extra: '', load: true};

function reducer(state, action) {
  const { load } = state;

  if (load) {
    console.log('fetch data from remote.')
    return {...state, load: false};
  };

  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'extra':
      return {...state, extra: 'hogehoge'};
    default:
      console.error('undefined action specified.')
      return state;
  }
}

export const DemoContext = createContext();

function Home() {
  const router = useRouter();

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(async () => {
    const timer = setTimeout(() => console.log('fired'), 1000);
    dispatch({});
  }, []);
  
  return (
    <>
    <ul>
      Count: {state.count} {state.extra}
      <button onClick={() => dispatch({type: 'increment'})}> + </button>
      <button onClick={() => dispatch({type: 'extra'})}> extra </button>
    </ul>
      <DemoContext.Provider value={{state, dispatch}}>
      <Side />
      </DemoContext.Provider>
    </>
  );
}

export default Home;
