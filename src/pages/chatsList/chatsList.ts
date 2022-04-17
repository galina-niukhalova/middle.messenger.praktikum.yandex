import './chatsList.style.scss';
import Block from 'utils/Block';
import { InputVariants } from 'components/input/types';
import { LinkVariants } from 'components/link/types';
import { registerComponent } from 'utils';
import classnames from 'helpers/classnames';
import { ChatImage, ChatsListItem } from './components';
import { IChatsProps, IChat, IChatMessage } from './types';

registerComponent(ChatImage, 'ChatImage');
registerComponent(ChatsListItem, 'ChatsListItem');

class Chats extends Block {
  constructor(props: IChatsProps) {
    const defaultProps = {
      activeChat: {
        userName: 'Igor',
      },
      chats: [
        {
          id: '1',
          user: {
            id: '1234',
            name: 'Igor',
            logo: '',
          },
          history: [{
            read: true,
            senderId: '1234',
            message: 'See you on Monday',
            date: 'Wed Nov 02 2022 10:06:00',
          }, {
            read: true,
            senderId: '1235',
            message: 'Take care!',
            date: 'Wed Nov 02 2022 10:07:00',
          }],
        },
        {
          id: '2',
          user: {
            id: '1236',
            name: 'Ivan',
            logo: '',
          },
          history: [{
            read: true,
            senderId: '1235',
            message: 'Hey, how are you?',
            date: 'Wed Nov 02 2022 15:06:00',
          }, {
            read: false,
            senderId: '1236',
            message: 'Hi, not bad. Thanks for asking. How are you?',
            date: 'Wed Nov 02 2022 15:07:00',
          }],
        },
      ],
    };

    super({
      ...defaultProps,
      ...props,
    });
  }

  isMessageEmpty(value: string) {
    return value === '';
  }

  protected getStateFromProps() {
    this.state = {
      activeChatId: null,
      activeChat: null,
      handleChatClick: (chatId: string) => {
        const activeChat = this.props.chats.find((chat: IChat) => chat.id === chatId) as IChat;

        const newState = {
          activeChatId: chatId,
          activeChat,
        };

        this.setState(newState);
      },
      handleMessageSend: () => {
        const inputElement = document.querySelector('.chat__footer input') as HTMLInputElement;

        if (!this.isMessageEmpty(inputElement.value)) {
          console.log({ message: inputElement.value });
          inputElement.value = '';
        }
      },
    };
  }

  getChatsList() {
    let chatsListString = '';
    this.props.chats.forEach((chat: IChat) => {
      const lastMessage = chat.history[chat.history.length - 1];
      const totalUnread = chat.history.reduce((prev: number, current: IChatMessage) => {
        if (!current.read) {
          return prev + 1;
        }
        return prev;
      }, 0);

      chatsListString += `
          {{{ ChatsListItem
                id="${chat.id}"
                userName="${chat.user.name}"
                userLogo="${chat.user.logo}"
                lastMessage="${lastMessage.message}"
                lastMessageDate="${lastMessage.date}"
                lastMessageSender="${lastMessage.senderId === chat.user.id ? chat.user.name : 'Вы'}"
                unread=${totalUnread}
                onChatClick=handleChatClick
          }}}
        `;
    });

    return chatsListString;
  }

  getChatWindow() {
    let messagesString = '';

    this.state.activeChat?.history.forEach((message: IChatMessage) => {
      const isCurrentUserSender = message.senderId !== this.state.activeChat?.user.id;
      const containerClassName = classnames('message', {
        message__right: isCurrentUserSender,
        message__left: !isCurrentUserSender,
      });

      messagesString += `
          <div class="${containerClassName}">${message.message}</div>
        `;
    });

    return messagesString;
  }

  render() {
    const { activeChatId, activeChat } = this.state;

    return `
      <div class="chats">
        <aside class="sidebar">
          <header class="sidebar__header">
            {{{ Link size="medium" label="Профиль" to="/profile" variant=${LinkVariants.NAV} }}}
          </header>
          <div class="sidebar__search">
            {{{ Input variant=${InputVariants.FILLED} placeholder="Поиск" }}}
          </div>
          <ul>
            ${this.getChatsList()}
          </ul>
        </aside>
        {{#if ${activeChatId}}}
          <main class="chat">
            <header class="chat__header">
              {{{ ChatImage size="small" imgUrl="${activeChat?.user.logo}" }}}
              <span>"${activeChat?.user.name}"</span>
            </header>
            <div class="chat__window">
              ${this.getChatWindow()}
            </div>
            <footer class="chat__footer">
              {{{ Input variant=${InputVariants.FILLED} placeholder="Сообщение" }}}
              {{{ Button onClick=handleMessageSend }}}
            </footer>
          </main>
        {{else}}
          <main class="empty-chat">
            Выберите чат чтобы отправить сообщение
          </main>
        {{/if}}
      </div>
    `;
  }
}

export default Chats;
