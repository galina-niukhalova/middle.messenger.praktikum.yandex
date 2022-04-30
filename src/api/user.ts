import HTTP, { Methods } from 'core/request';
import {
  ChangeUserProfileRequest,
  ChangeUserProfileResponse,
  ChangeAvatarRequest,
  ChangeUserPasswordRequest,
  ChangeUserPasswordResponse,
  GetUserByIdRequest,
  FindUserRequest,
  UserDTO,
} from './types/user';

const userAPIInstance = new HTTP('https://ya-praktikum.tech/api/v2/user');

class UserAPI {
  changeUserProfile(data: ChangeUserProfileRequest) {
    return userAPIInstance.put('/profile', { data })
      .then(({ response }) => response as ChangeUserProfileResponse);
  }

  changeAvatar(data: ChangeAvatarRequest) {
    return userAPIInstance.put('/profile/avatar', {
      data,
      isFile: true,
    }).then(({ response }) => (response as UserDTO));
  }

  changeUserPassword(data: ChangeUserPasswordRequest) {
    return userAPIInstance.put('/password', { data })
      .then(({ response }) => response as ChangeUserPasswordResponse);
  }

  getUserById(data: GetUserByIdRequest) {
    return userAPIInstance.fetchWithRetry(`/${data.id}`, {
      method: Methods.GET,
    }).then((response) => {
      console.log('getUserById Users API', response);
    });
  }

  findUserByLogin(data: FindUserRequest) {
    return userAPIInstance.post('/search', {
      data,
    }).then(({ response }) => (response as UserDTO[]));
  }
}

export default new UserAPI();
