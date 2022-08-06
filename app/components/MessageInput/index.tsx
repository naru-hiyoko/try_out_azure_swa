import { ReactElement, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router'
import * as z from 'zod';
import { Message } from '../../models/Message'
import * as MessageRepo from '../../repository/MessageRepository';

export const MessageInput = (props): ReactElement => {
  const {register, handleSubmit} = useForm({});
  const router = useRouter();

  const submitEventHandler = handleSubmit(async (data) => {
    MessageRepo.createOne({message: data.message});
    router.push('/message', undefined, { shallow: false });
  });

  return (
    <form onSubmit={submitEventHandler}>
      <p> Register New Item </p>
      <div>
        content：
        <input data-testid="input-content" {...register('message')} />
        <input data-testid="submit-button" type="submit" />
      </div>
    </form>
  );
};
