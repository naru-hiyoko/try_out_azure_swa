import { ReactElement, useEffect, useState, createContext, useContext, useRef} from 'react';
import { useRouter } from 'next/router'
import { MessageInput } from '../../components/MessageInput';
import { MessageCard } from '../../components/MessageCard';
import * as MessageRepo from '../../repository/MessageRepository';
import {ThemeProvider} from '@primer/react'

export const UserContext = createContext();

export default function Message(props) {
  const router = useRouter();

  const message1 = {id: 100, content: 'msg1'};
  const [messageList, setMessageList] = useState([]);
  const [user, setUser] = useState<string>(null);

  const interval = useRef(null);
  const count = useRef<int>(0);

  useEffect(async () => {
    console.log(messageList);
    if (messageList.length === 0) {
      const messages = await MessageRepo.getList();
      setMessageList(messages);
    }
  });

  return (
    <ThemeProvider>
      <UserContext.Provider value={user}>
        <MessageInput />
      </UserContext.Provider>
      <MessageCard key={message1.id.toString()} id={message1.id} message={message1} />
      {
        messageList.map((msg) => {
          return <MessageCard key={msg.id} id={msg.id} message={msg} />
        })
      }
    </ThemeProvider>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      respondAt: '2022-01-01T00:00:00',
      messageList: [],
    },
  }
}
