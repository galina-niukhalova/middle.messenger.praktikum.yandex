import { Block, renderDOM, registerComponent } from 'utils';
import './base.scss';
import Block from 'utils/Block';
import LoginPage from 'pages/login';
import SignupPage from 'pages/signup';
import ChatsPage from 'pages/chatsList';
import ChatPage from 'pages/chat';
import NotFoundPage from 'pages/notFound';
import ErrorPage from 'pages/error';
import UserProfilePage from 'pages/userProfile';
import TestPage from 'pages/test';

import {
  Button,
  Link,
  Input,
  Form,
} from 'components';

function registerComponents() {
  registerComponent(Button);
  registerComponent(Link);
  registerComponent(Input);
  registerComponent(Form);
}

document.addEventListener('DOMContentLoaded', () => {
  registerComponents();

  switch (window.location.pathname) {
    case '/':
    case '/login':
      renderDOM(LoginPage);
      break;

    //   case '/signup':
    //     page = new SignupPage({});
    //     break;

    //   case '/chats':
    //     page = new ChatsPage();
    //     break;

    //   case '/chat':
    //     page = new ChatPage();
    //     break;

    //   case '/profile':
    //     page = new UserProfilePage({});
    //     break;

    //   case '/error':
    //     page = new ErrorPage();
    //     break;

    default:
      console.log('not found');
      renderDOM(TestPage);
  }
});
