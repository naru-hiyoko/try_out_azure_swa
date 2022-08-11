import { ReactElement, useEffect, useState, useContext, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router'
import Alert from 'react-popup-alert'
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
  const [fieldErrors, setFieldErrors] = useState<string>([]);
  const [alert, setAlert] = useState({type: 'error', text: '', show: false});
  const {register, handleSubmit} = useForm({});

  const user = useContext(MessagePage.UserContext);
  console.log(user);

  const login = useRef<int>(0);

  const onCloseAlert = () => {
    setAlert({type: '', text: '', show: false});
    login.current += 1;
  }

  const submitCreateEventHandler = handleSubmit(async (data) => {
    const {success, error} = await schema.safeParse(data);
    if (success) {
      setButtonPressedCount(buttonPressedCount + 1);
      MessageRepo.createOne({message: data.messageA});
      router.push('/message', undefined, { shallow: false });
    } else {
      const {fieldErrors} = error.flatten();
      var errors = [];
      Object.keys(fieldErrors).forEach((k) => {
        errors.push(k + ' : ' + fieldErrors[k][0]);
      });
      setFieldErrors(errors);
      setAlert({type: 'error', text: errors[0], show: true});
    }
  });

  return (
    <>
      <div>
        <p> Registration count: {buttonPressedCount.toString()} </p>
        <form onSubmit={submitCreateEventHandler}>
          <input data-testid="input-content" {...register('messageA')} />
          <input data-testid="submit-button" type="submit" />
        </form>
        <Alert
          header={'エラー'}
          btnText={'Close'}
          text={alert.text}
          type={alert.type}
          show={alert.show}
          onClosePress={onCloseAlert}
          pressCloseOnOutsideClick={true}
          showBorderBottom={false}
          alertStyles={{}}
          headerStyles={{}}
          textStyles={{}}
          buttonStyles={{}}
        />
      </div>
    </>
  );
};
