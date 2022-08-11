import { ReactElement, useEffect, useState, createContext, useContext } from 'react';

export default function Index() {
  const [user, setUser] = useState<string>("Jesse Hall2");

  useEffect(() => {
    setTimeout(() => {
      window.localStorage.setItem('user', user);
      console.log('persist user.');
    }, 1000);
  });

  return (
    <ul>
      This is entry page.
    </ul>
  );
}
