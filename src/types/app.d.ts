import { Router } from 'core';

declare global {
  export type Nullable<T> = T | null;

  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];

  export type GlobalState = {
    isLoading: boolean;
  };

  interface Window {
    // store: Store<AppStore>;
    router: Router;
  }

  export enum Routes {
    Home = '/',
    Login = '/login',
    Signup = '/signup',
    Chats = '/chats',
    Profile = '/profile',
    Error = '/error'
  }
}

export { };
