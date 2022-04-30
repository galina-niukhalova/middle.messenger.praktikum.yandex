import HTTP, { Methods } from 'core/request';
import {
  CreateChatRequest,
  CreateChatResponseData,
  DeleteChatRequest,
  DeleteChatResponseData,
  DeleteUserFromChatResponseData,
  AddUsersToChatResponseData,
  GetChatUsersRequest,
  GetChatUsersResponse,
  GetNewMessagesRequest,
  UploadAvatarRequest,
  AddUsersToChatRequest,
  DeleteUsersFromChatRequest,
  ChatDTO,
  GetTokenResponseData,
} from './types/chats';

const chatsAPIInstance = new HTTP('https://ya-praktikum.tech/api/v2/chats');

class ChatsAPI {
  get() {
    return chatsAPIInstance.get('')
      .then(({ response }) => response as ChatDTO[]);
  }

  createChat(data: CreateChatRequest) {
    return chatsAPIInstance.post('', {
      data,
    }).then(({ response }) => (response as CreateChatResponseData));
  }

  deleteChat(data: DeleteChatRequest) {
    return chatsAPIInstance.delete('', {
      data,
    }).then(({ response }) => (response as DeleteChatResponseData));
  }

  getChatUsers(data: GetChatUsersRequest) {
    return chatsAPIInstance.get(`/${data.id}/users`)
      .then(({ response }) => (response as GetChatUsersResponse));
  }

  getNewMessages(data: GetNewMessagesRequest) {
    return chatsAPIInstance.fetchWithRetry(`/new/${data.id}`, {
      method: Methods.GET,
    }).then((response) => {
      console.log('getNewMessages Chats API', response);
    });
  }

  uploadAvatar(data: UploadAvatarRequest) {
    return chatsAPIInstance.fetchWithRetry('/avatar', {
      method: Methods.PUT,
      data,
    }).then((response) => {
      console.log('uploadAvatar Chats API', response);
    });
  }

  addUsersToChat(data: AddUsersToChatRequest) {
    return chatsAPIInstance.put('/users', {
      data,
    }).then(({ response }) => (response as AddUsersToChatResponseData));
  }

  deleteUsersFromChat(data: DeleteUsersFromChatRequest) {
    return chatsAPIInstance.delete('/users', {
      data,
    }).then(({ response }) => (response as DeleteUserFromChatResponseData));
  }

  getToken(chatId: string) {
    return chatsAPIInstance.post(`/token/${chatId}`)
      .then(({ response }) => (response as GetTokenResponseData));
  }
}

export default new ChatsAPI();
