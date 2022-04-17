import HTTP, { Methods } from 'core/request';
import {
  CreateChatRequest,
  DeleteChatRequest,
  GetChatUsersRequest,
  GetNewMessagesRequest,
  UploadAvatarRequest,
  AddUsersToChatRequest,
  DeleteUsersFromChatRequest,
} from './types/chats';

const chatsAPIInstance = new HTTP('https://ya-praktikum.tech/api/v2/chats');

class ChatsAPI {
  get() {
    return chatsAPIInstance.fetchWithRetry('', {
      method: Methods.GET,
    }).then((response) => {
      console.log('get Chats API', response);
    });
  }

  createChat(data: CreateChatRequest) {
    return chatsAPIInstance.fetchWithRetry('', {
      method: Methods.POST,
      data,
    }).then((response) => {
      console.log('createChat Chats API', response);
    });
  }

  deleteChat(data: DeleteChatRequest) {
    return chatsAPIInstance.fetchWithRetry('', {
      method: Methods.DELETE,
      data,
    }).then((response) => {
      console.log('deleteChat Chats API', response);
    });
  }

  getChatUsers(data: GetChatUsersRequest) {
    return chatsAPIInstance.fetchWithRetry(`/${data.id}/users`, {
      method: Methods.GET,
    }).then((response) => {
      console.log('getChatUsers Chats API', response);
    });
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
    return chatsAPIInstance.fetchWithRetry('/users', {
      method: Methods.PUT,
      data,
    }).then((response) => {
      console.log('addUsersToChat Chats API', response);
    });
  }

  deleteUsersFromChat(data: DeleteUsersFromChatRequest) {
    return chatsAPIInstance.fetchWithRetry('/users', {
      method: Methods.DELETE,
      data,
    }).then((response) => {
      console.log('deleteUsersFromChat Chats API', response);
    });
  }
}

export default ChatsAPI;
