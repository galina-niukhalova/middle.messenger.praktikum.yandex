import './error.style.scss';
import Block from 'utils/Block';
import Link from 'components/link';
import errorTemplate from './error.tmpl.hbs';

class ErrorPage extends Block {
  initChildren() {
    this.children.link = new Link({
      label: 'Назад к чатам',
      url: '/chats',
    });
  }

  render() {
    return this.compile(errorTemplate, {});
  }
}

export default ErrorPage;

