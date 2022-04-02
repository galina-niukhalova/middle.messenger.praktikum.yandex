import './chatsList.style.scss';
import Block from 'utils/Block';
import chatsListTemplate from './chatsList.tmpl.hbs';

class Chats extends Block {
  render() {
    return this.compile(chatsListTemplate, {});
  }
}

export default Chats;
