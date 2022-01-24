import './base.scss';
import 'components';
import renderLoginPage from 'pages/login';
import renderSignupPage from 'pages/signup';
import renderChatsListPage from 'pages/chatsList';
import renderChatPage from 'pages/chat';
import renderUserProfilePage from 'pages/userProfile';
import renderNotFoundPage from 'pages/notFound';
import renderErrorPage from 'pages/error';

switch (window.location.pathname) {
  case '/':
    renderLoginPage();
    break;
  case '/login':
    renderLoginPage();
    break;

  case '/signup':
    renderSignupPage();
    break;

  case '/chats':
    renderChatsListPage();
    break;

  case '/chat':
    renderChatPage();
    break;

  case '/profile':
    renderUserProfilePage();
    break;

  case '/error':
    renderErrorPage();
    break;

  default: {
    renderNotFoundPage();
  }
}
