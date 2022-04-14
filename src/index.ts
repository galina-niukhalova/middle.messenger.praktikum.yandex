import { registerComponent, Router } from 'utils';
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

  router
    .use('/', LoginPage)
    .use('/login', LoginPage)
    .use('/signup', SignupPage)
    .use('/chats', ChatsPage)
    .use('/profile', UserProfilePage)
    .use('/error', ErrorPage)
    .use('/not-found', NotFoundPage)
    .start();
});
