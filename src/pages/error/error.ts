import './error.style.scss';
import Block from 'utils/Block';

class ErrorPage extends Block<{}> {
  render() {
    return `
      <div class='error-page'>
        <h1 class='error-page__header'>500</h1>
        <h3 class='error-page__description'>Мы уже фиксим</h3>
        {{{ Link to="/chats" label="Назад к чатам" }}}
     </div>
    `;
  }
}

export default ErrorPage;
