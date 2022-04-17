import { renderDOM, registerComponent } from 'utils';
import './base.scss';
import LoginPage from 'pages/login';
import SignupPage from 'pages/signup';
import ChatsPage from 'pages/chatsList';
import NotFoundPage from 'pages/notFound';
import ErrorPage from 'pages/error';
import UserProfilePage from 'pages/userProfile';
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

  switch (window.location.pathname) {
    case '/':
    case '/login':
      renderDOM(LoginPage);
      break;

    case '/signup':
      renderDOM(SignupPage);
      break;

    case '/chats':
      renderDOM(ChatsPage);
      break;

    case '/profile':
      renderDOM(UserProfilePage);
      break;

    case '/error':
      renderDOM(ErrorPage);
      break;

    default:
      renderDOM(NotFoundPage);
  }
});
