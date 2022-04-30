import { Router } from 'core';
import { Store } from 'core/Store';

declare global {
  export type Nullable<T> = T | null;

  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];
  export type Indexed<T = unknown> = {
    [key in string]: T;
  };
  export type StringIndexed = Record<string, any>;

  type PlainObject<T = unknown> = {
    [k in string]: T;
  };

  export type AppState = {
    isLoading: boolean;
    loginFormError: string;
    signupFormError: string,
    addUserError: string,
    deleteUserError: string,
    user: Nullable<User>,
    appIsInited: boolean,
    chats: Chat[],
    searchResult: User[],
    chatUsers: User[],
  };

  interface Window {
    store: Store<AppState>;
    router: Router;
  }

  export type User = {
    id: number;
    login: string;
    firstName: string;
    secondName: string;
    displayName: string;
    avatar: string;
    phone: string;
    email: string;
  };

  export type Chat = {
    id: number,
    title: string,
    avatar: string,
    unreadCount: string,
  }
}

export { };
