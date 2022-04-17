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
import './utils/registerHandlebarsHelpers';
import {
  Button,
  Link,
  Input,
  InputField,
  AuthForm,
  ProfileForm,
  Avatar,
} from 'components';

function registerComponents() {
  registerComponent(Button, 'Button');
  registerComponent(Link, 'Link');
  registerComponent(Input, 'Input');
  registerComponent(InputField, 'InputField');
  registerComponent(AuthForm, 'AuthForm');
  registerComponent(ProfileForm, 'ProfileForm');
  registerComponent(Avatar, 'Avatar');
}

document.addEventListener('DOMContentLoaded', () => {
  registerComponents();

  const router = new Router('#app');

  window.router = router;

  router
    .use('/', LoginPage)
    .use(Routes.Login, LoginPage)
    .use(Routes.Signup, SignupPage)
    .use(Routes.Chats, ChatsPage)
    .use(Routes.Profile, UserProfilePage)
    .use(Routes.Error, ErrorPage)
    .use('/not-found', NotFoundPage)
    .start();
});
