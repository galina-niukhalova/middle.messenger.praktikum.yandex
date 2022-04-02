import './notFound.style.scss';
import Block from 'utils/Block';
import Link from 'components/link';
import notFoundTemplate from './notFound.hbs';

class NotFoundPage extends Block {
  initChildren() {
    this.children.link = new Link({
      label: 'Назад к чатам',
      url: '/chats',
    });
  }

  render() {
    return this.compile(notFoundTemplate, {});
  }
}

export default NotFoundPage;
