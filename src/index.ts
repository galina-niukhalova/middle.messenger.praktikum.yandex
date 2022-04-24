import { Router, registerComponent } from 'core';
import './base.scss';
import {
  LoginPage,
  SignupPage,
  ChatsPage,
  NotFoundPage,
  ErrorPage,
  UserProfilePage,
} from 'pages';
import { defaultState } from 'store';
import './utils/registerHandlebarsHelpers';
import {
  Button,
  Link,
  Input,
  InputField,
  AuthForm,
  ProfileForm,
  Avatar,
  Spinner,
  Error,
} from 'components';
import { Routes } from 'const';
import { Store } from 'core/Store';
import { initApp } from 'services/initApp';

function registerComponents() {
  registerComponent(Button, 'Button');
  registerComponent(Link, 'Link');
  registerComponent(Input, 'Input');
  registerComponent(InputField, 'InputField');
  registerComponent(AuthForm, 'AuthForm');
  registerComponent(ProfileForm, 'ProfileForm');
  registerComponent(Avatar, 'Avatar');
  registerComponent(Spinner, 'Spinner');
  registerComponent(Error, 'Error');
}

document.addEventListener('DOMContentLoaded', () => {
  registerComponents();

  const store = new Store<AppState>(defaultState);
  const router = new Router('#app');
  window.router = router;
  window.store = store;

  store.dispatch(initApp);

  router
    .use(Routes.Login, LoginPage)
    .use(Routes.Signup, SignupPage)
    .use(Routes.Chats, ChatsPage)
    .use(Routes.Profile, UserProfilePage)
    .use(Routes.Error, ErrorPage);
  // .use('/not-found', NotFoundPage)

  store.on('changed', (prevState, nextState) => {
    if (!prevState.appIsInited && nextState.appIsInited) {
      router.start();
    }
  });
});
