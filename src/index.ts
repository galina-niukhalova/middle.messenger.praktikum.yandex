import renderDOM from 'utils/renderDOM';
import './base.scss';
import Block from 'utils/Block';
import LoginPage from 'pages/login';
import SignupPage from 'pages/signup';
import ChatsPage from 'pages/chatsList';
import ChatPage from 'pages/chat';
import NotFoundPage from 'pages/notFound';
import ErrorPage from 'pages/error';
import UserProfilePage from 'pages/userProfile';

let page: Block;

switch (window.location.pathname) {
  case '/':
  case '/login':
    page = new LoginPage({});
    break;

  case '/signup':
    page = new SignupPage({});
    break;

  case '/chats':
    page = new ChatsPage();
    break;

  case '/chat':
    page = new ChatPage();
    break;

  case '/profile':
    page = new UserProfilePage({});
    break;

  case '/error':
    page = new ErrorPage();
    break;

  default:
    console.log('not found');
    page = new NotFoundPage();
}

// app — это class дива в корне DOM
// render('.app', new ChatPage());
document.addEventListener('DOMContentLoaded', () => {
  renderDOM('#app', page);
});
