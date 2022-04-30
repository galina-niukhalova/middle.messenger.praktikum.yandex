import { Block } from 'core';
import './addChat.scss';
import 'components/modal/modal.scss';
import { IconName } from 'components/icon';
import { InputVariants } from 'components/input/types';

interface IAddChatProps {
  close: () => void,
  createChat: (name: string) => void,
}

class AddChat extends Block<IAddChatProps> {
  protected getStateFromProps() {
    this.state = {
      onCreateChatClick: this.handleCreateChat.bind(this),
    };
  }

  handleCreateChat(e: Event) {
    e.preventDefault();

    const nameInput = this.refs.name as HTMLInputElement;

    if (nameInput) {
      this.props.createChat(nameInput.value);
      this.props.close();
    }
  }

  render() {
    return `
      <div>
        <div class="modal__backdrop"></div>
        <div class="modal">
          {{{ Icon className="modal__close" name=${IconName.Close} onClick=close }}}
          <h2 class="modal__title">Создать чат</h2>
          <form class="new-chat-form">
            {{{ Input ref="name" className="new-chat-input" variant=${InputVariants.FILLED} placeholder="Название" }}}
            {{{ Button label="Создать" className="new-chat-submit-button" type="submit" onClick=onCreateChatClick }}}
          </form>
        </div>
      </div>
    `;
  }
}

export default AddChat;
