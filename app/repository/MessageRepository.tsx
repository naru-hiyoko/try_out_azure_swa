import { Message } from '../models/Message';

export type CreateParameter = {
  message: string;
};

const apiHost = process.env.NEXT_PUBLIC_AZFUN_API_HOST;

export const getList = async (): Promise<Message[]> => {
  const resp = await fetch(apiHost + '/api/message/all');

  if (resp.ok) {
    const respMessageList = (await resp.json()) as Message[];
    return respMessageList;
  } else {
    return;
  }
};

export const createOne = async (params: CreateParameter): Promise<void> => {
  const resp = await fetch(apiHost + '/api/message/create_one', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(params),
  }).then((resp) => {
    if (resp.ok) {
      return;
    } else {
      console.log(resp.statusText);
      return;
    }
  })
    .catch((error) => {
    console.log(error);
    return;
  });
};

export const deleteOne = async (id: number): Promise<void> => {
  const resp = await fetch(apiHost + '/api/message/remove_one' + '?' + 'id=' + id, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({}),
  }).then((resp) => {
    return;
  }).catch((error) => {
    console.log(error);
    return;
  });
};
