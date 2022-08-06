import { ReactElement, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router'
import { Message } from '../../models/Message'
import * as MessageRepo from '../../repository/MessageRepository';

export const MessageCard = (props): ReactElement => {
  const {id, message} = props;
  const {register, handleSubmit} = useForm({});
  const router = useRouter();

  const submitEventHandler = handleSubmit(async (data) => {
    await MessageRepo.deleteOne(data['messageId']);
    router.push('/message', undefined, { shallow: false });
  });

  return (
    <form onSubmit={submitEventHandler}>
      <li>
        {id}:  {message.content}
        <span> &nbsp; </span>
        <input data-testid="submit-button" type="submit" value="削除" />
      <input data-testid="input-delete-id" type="hidden" {...register('messageId')} value={id} />
      </li>
    </form>
  );
};
