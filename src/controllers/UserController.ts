import UserAPI from 'api/user';
import {
  ChangeUserProfileFormData,
  ChangeUserPasswordFormData,
  UploadAvatarFormData,
} from './types/user';

const userApi = new UserAPI();

class UserController {
  public async changeUserProfile(data: ChangeUserProfileFormData) {
    try {
      userApi.changeUserProfile(data).then((response) => {
        console.log('Change user profile', response);
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async changePassword(data: ChangeUserPasswordFormData) {
    try {
      userApi.changeUserPassword(data).then((response) => {
        console.log('Change user password', response);
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async uploadAvatar(data: UploadAvatarFormData) {
    try {
      userApi.changeAvatar(data).then((response) => {
        console.log('Upload avatar', response);
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default UserController;
