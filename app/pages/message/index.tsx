import { ReactElement, useEffect, useState, createContext, useContext, useRef} from 'react';
import { useRouter } from 'next/router'
import { MessageInput } from '../../components/MessageInput';
import { MessageCard } from '../../components/MessageCard';
import * as MessageRepo from '../../repository/MessageRepository';

export const UserContext = createContext();

export default function Message(props) {
  const router = useRouter();

  const { messageList } = props;
  const message1 = {id: 100, content: 'msg1'};
  const [user, setUser] = useState<string>(null);

  const interval = useRef(null);
  const count = useRef<int>(0);

  useEffect(() => {
    interval.current = setInterval(() => {
      if (window && user === null) {
        const user = window.localStorage.getItem('user');
        clearInterval(interval.current);
        console.log({count: count.current, user: user});
        if (user) {
          setUser(user);
        } else {
          router.push('/');
        }
      }
      count.current = count.current + 1;
    }, 100);
  });

  return (
    <>
      <UserContext.Provider value={user}>
        <MessageInput />
      </UserContext.Provider>
      <MessageCard key={message1.id.toString()} id={message1.id} message={message1} />
      {
        messageList.map((msg) => {
          return <MessageCard key={msg.id} id={msg.id} message={msg} />
        })
      }
    </>
  );
}

export async function getServerSideProps(context) {
  const messageList = await MessageRepo.getList();
  return {
    props: {
      respondAt: '2022-01-01T00:00:00',
      messageList: messageList,
    },
  }
}
