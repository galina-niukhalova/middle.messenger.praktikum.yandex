import './chat.style.scss';
import Block from 'utils/Block';
import chatTemplate from './chat.tmpl.hbs';

class ChatPage extends Block {
  render() {
    return this.compile(chatTemplate, {});
  }
}

export default ChatPage;

