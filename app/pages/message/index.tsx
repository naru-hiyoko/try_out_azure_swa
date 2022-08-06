import { MessageInput } from '../../components/MessageInput';
import { MessageCard } from '../../components/MessageCard';
import * as MessageRepo from '../../repository/MessageRepository';

export default function Message(props) {
  const message1 = {id: 100, content: 'msg1'};
  const { messageList } = props;
  return (
    <>
      <MessageInput />
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
