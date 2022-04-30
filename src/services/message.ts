import chatsAPI from 'api/chats';
import type { Dispatch } from 'core';
import { apiHasError } from 'helpers/apiHasError';
import { CreateConnectionPayload } from './types/message';
import { logout } from './auth';

const BASE_URL = 'wss://ya-praktikum.tech/ws';

export const createConnection = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: CreateConnectionPayload,
) => {
  const tokenResponse = await chatsAPI.getToken(action.chatId);

  if (apiHasError(tokenResponse)) {
    dispatch(logout);
    return;
  }

  const userID = state.user?.id;
  const socket = new WebSocket(`${BASE_URL}/chats/${userID}/${action.chatId}/${tokenResponse.token}`);

  socket.addEventListener('open', () => {
    console.log('Соединение установлено');
  });

  socket.addEventListener('close', (event) => {
    if (event.wasClean) {
      console.log('Соединение закрыто чисто');
    } else {
      console.log('Обрыв соединения');
    }

    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
  });

  socket.addEventListener('message', (event) => {
    console.log('Получены данные', event.data);
  });

  socket.addEventListener('error', (event: Event) => {
    console.log('Ошибка', event.message);
  });
};
