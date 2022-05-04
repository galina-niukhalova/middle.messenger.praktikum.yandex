import './notFound.style.scss';
import Block from 'core/Block';

class NotFoundPage extends Block<{}> {
  render() {
    return `
      <div class='not-found-page'>
        <h1 class='not-found-page__header'>404</h1>
        <h3 class='not-found-page__description'>Не туда попали</h3>
        {{{ Link to="/chats" label="Назад к чатам" }}}
      </div>
    `;
  }
}

export default NotFoundPage;
