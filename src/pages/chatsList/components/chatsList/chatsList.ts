import Block from 'core/Block';
import './chatsList.style.scss';

type IChat = {
  id: string,
  title: string,
  userLogo: string,
  lastMessage: string,
  lastMessageDate: string,
  lastMessageSender: string,
  unread: number,
}

interface IChatsListProps {
  chats: IChat[],
  activeChat: IChat,
  onChatClick: (id: number) => {},
}

interface IChatsListPropsWithEvents extends Omit<IChatsListProps, 'onChatClick'> {
  events: {
    click: EventListener,
  }
}

class ChatsList extends Block<IChatsListPropsWithEvents> {
  constructor(props: IChatsListProps) {
    super({
      ...props,
      events: {
        click: (e: Event) => {
          const { target } = e;

          const item = (target as HTMLElement).closest('li') as HTMLLIElement;
          if (item) {
            const id = parseInt(item.dataset.id!, 10);
            props.onChatClick(id);
          }
        },
      },
    });
  }

  getDate(lastMessageDate: null | string) {
    if (lastMessageDate) {
      const date = new Date(lastMessageDate);
      const day = `0${date.getDate()}`.slice(-2);
      const month = `0${date.getMonth()}`.slice(-2);
      const year = date.getFullYear().toString().slice(-2);

      return `${day}.${month}.${year}`;
    }
    return '';
  }

  render() {
    return `
    <ul class="sidebar__body">
      ${this.props.chats.map((chat: IChat) => `
          <li 
            class="chats-list-item ${chat.id === this.props.activeChat?.id ? 'chats-list-item_active' : ''}" 
            data-id=${chat.id}>
          {{{ ChatImage 
            imgUrl=${chat.userLogo}
            size="medium" 
            active=${chat.id === this.props.activeChat?.id}
          }}}
          <div class="chats-list-item__content">
            <div class="chats-list-item__name">${chat.title}</div>
            {{#if ${chat.lastMessageSender}}}
              <div class="chats-list-item__message">
                <div class="chats-list-item__sender">${chat.lastMessageSender}:</div>
                ${chat.lastMessage}
              </div>
            {{/if}}
          </div>

          <div class="chats-list-item__side">
            <div class="chats-list-item__date">${this.getDate(chat.lastMessageDate)}</div>
            {{#if unread}}
              <div class="chats-list-item__unread">${chat.unread}</div>
            {{/if}}
          </div>
        </li>
      `).join('')}
    </ul>
  `;
  }
}

export default ChatsList;
