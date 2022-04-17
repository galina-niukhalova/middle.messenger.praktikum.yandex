import HTTP, { Methods } from 'core/request';
import {
  ChangeUserProfileRequest,
  ChangeAvatarRequest,
  ChangeUserPasswordRequest,
  GetUserByIdRequest,
  FindUsersRequest,
} from './types/user';

const userAPIInstance = new HTTP('https://ya-praktikum.tech/api/v2/user');

class UserAPI {
  changeUserProfile(data: ChangeUserProfileRequest) {
    return userAPIInstance.fetchWithRetry('/profile', {
      method: Methods.PUT,
      data,
    }).then((response) => {
      console.log('changeUserProfile Users API', response);
    });
  }

  changeAvatar(data: ChangeAvatarRequest) {
    return userAPIInstance.fetchWithRetry('/profile/avatar', {
      method: Methods.PUT,
      data,
    }).then((response) => {
      console.log('changeAvatar Users API', response);
    });
  }

  changeUserPassword(data: ChangeUserPasswordRequest) {
    return userAPIInstance.fetchWithRetry('/profile/password', {
      method: Methods.PUT,
      data,
    }).then((response) => {
      console.log('changeUserPassword Users API', response);
    });
  }

  getUserById(data: GetUserByIdRequest) {
    return userAPIInstance.fetchWithRetry(`/${data.id}`, {
      method: Methods.GET,
    }).then((response) => {
      console.log('getUserById Users API', response);
    });
  }

  findUsers(data: FindUsersRequest) {
    return userAPIInstance.fetchWithRetry('/search', {
      method: Methods.POST,
      data,
    }).then((response) => {
      console.log('findUsers Users API', response);
    });
  }
}

export default UserAPI;
