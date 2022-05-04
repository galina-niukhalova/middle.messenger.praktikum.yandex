import authAPI from 'api/auth';
import { Routes } from 'const';
import type { Dispatch } from 'core';
import { apiHasError } from 'helpers/apiHasError';
import { transformUser } from 'helpers/apiTransformers';
import { SignupFormData } from 'components/authForm/types';
import { LoginPayload, SignupPayload } from './types/auth';

export const login = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: LoginPayload,
) => {
  dispatch({ isLoading: true });

  const response = await authAPI.signin(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });
    return;
  }

  const responseUser = await authAPI.getUser();

  dispatch({ isLoading: false, loginFormError: '' });

  if (apiHasError(responseUser)) {
    dispatch(logout);
    return;
  }

  dispatch({ user: transformUser(responseUser) });

  window.router.go(Routes.Chats);
};

export const signup = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: SignupFormData,
) => {
  dispatch({ isLoading: true });

  const mapFieldToApi = {
    email: 'email',
    login: 'login',
    firstName: 'first_name',
    secondName: 'second_name',
    password: 'password',
    phone: 'phone',
  };

  type SignupFormKeys = keyof (typeof mapFieldToApi);
  type SignupAPIKeys = keyof SignupPayload;

  const data: SignupPayload = {} as SignupPayload;

  Object.keys(mapFieldToApi).forEach((key: SignupFormKeys) => {
    data[mapFieldToApi[key] as SignupAPIKeys] = action[key];
  });

  const response = await authAPI.signup(data);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, signupFormError: response.reason });
    return;
  }

  const responseUser = await authAPI.getUser();

  dispatch({ isLoading: false, signupFormError: '' });

  if (apiHasError(responseUser)) {
    dispatch(logout);
    return;
  }

  dispatch({ user: transformUser(responseUser) });

  window.router.go(Routes.Chats);
};

export const logout = async () => {
  await authAPI.logout();

  const currentRoute = window.router.getRoute(window.location.pathname);

  if (currentRoute?.match(Routes.Login) || currentRoute?.match(Routes.Signup)) {
    return;
  }

  window.router.go(Routes.Login);
};
