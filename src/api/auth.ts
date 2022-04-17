import HTTP, { Methods } from 'core/request';
import {
  SignupRequest,
  SigninRequest,
} from './types/auth';

const authAPIInstance = new HTTP('https://ya-praktikum.tech/api/v2/auth');

class AuthAPI {
  signup(data: SignupRequest) {
    return authAPIInstance.fetchWithRetry('/signup', {
      method: Methods.POST,
      data,
    }).then((response) => {
      console.log('signup Auth API', response);
    });
  }

  signin(data: SigninRequest) {
    return authAPIInstance.fetchWithRetry('/signin', {
      method: Methods.POST,
      data,
    }).then((response) => {
      console.log('signin Auth API', response);
    });
  }

  getUser() {
    return authAPIInstance.fetchWithRetry('/user', {
      method: Methods.GET,
    }).then((response) => {
      console.log('getUser API request', response);
    });
  }

  logout() {
    return authAPIInstance.fetchWithRetry('/logout', {
      method: Methods.POST,
    }).then((response) => {
      console.log('Logout API request', response);
    });
  }
}

export default AuthAPI;
