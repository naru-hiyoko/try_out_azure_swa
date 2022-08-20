import { ReactElement, useEffect, useState, useContext, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router'
import { Box, Button, TextInput, FormControl } from '@primer/react'
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod';
import { Message } from '../../models/Message'
import * as MessageRepo from '../../repository/MessageRepository';
import * as MessagePage from '../../pages/message/index';

const schema = zod.object({
  messageA: zod.string().nonempty({ message: "Can't be empty" }),
});

export const MessageInput = (props): ReactElement => {
  const router = useRouter();
  const [buttonPressedCount, setButtonPressedCount] = useState<int>(0);
  const [fieldErrors, setFieldErrors] = useState([]);
  const [alert, setAlert] = useState({type: 'error', text: '', show: false});
  const {register, handleSubmit} = useForm({});

  const user = useContext(MessagePage.UserContext);
  const login = useRef<int>(0);

  const submitCreateEventHandler = handleSubmit(async (data) => {
    const {success, error} = await schema.safeParse(data);
    if (success) {
      setButtonPressedCount(buttonPressedCount + 1);
      MessageRepo.createOne({message: data.messageA});
      // router.push('/message', undefined, { shallow: false });
      router.reload();
    } else {
      console.log(error);
    }
  });

  return (
    <>
      <Box borderColor="border.default" borderBottomWidth={1} borderBottomStyle="solid" pb={3}>
        Registration count: {buttonPressedCount.toString()}
      </Box>

      <form onSubmit={submitCreateEventHandler}>
        <Box display="flex">
          <Box p={3} borderColor="border.default" borderWidth={1} borderStyle="solid">
            <TextInput {...register('messageA')} />
          </Box>
          <Box p={3} borderColor="border.default" borderWidth={1} borderStyle="solid">
            <Button variant="outline" data-testid="submit-button" type="submit" > 送信 </Button>
          </Box>
        </Box>
      </form>
    </>
  );
};
