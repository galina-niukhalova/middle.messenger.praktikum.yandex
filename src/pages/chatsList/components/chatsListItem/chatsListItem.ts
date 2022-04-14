import Block from 'utils/Block';
import './chatsListItem.style.scss';

interface IChatsListItemProps {
  id: string,
  userName: string,
  userLogo: string,
  lastMessage: string,
  lastMessageDate: string,
  lastMessageSender: string,
  unread: number,
  onChatClick: (id: string) => {},
}

interface IChatsListItemPropsWithEvents extends Omit<IChatsListItemProps, 'onChatClick'> {
  events: {
    click: EventListener,
  }
}

class ChatsListItem extends Block<IChatsListItemPropsWithEvents> {
  constructor(props: IChatsListItemProps) {
    super({
      ...props,
      events: {
        click: () => props.onChatClick(props.id),
      },
    });
  }

  getDate() {
    const date = new Date(this.props.lastMessageDate);
    const day = `0${date.getDate()}`.slice(-2);
    const month = `0${date.getMonth()}`.slice(-2);
    const year = date.getFullYear().toString().slice(-2);

    return `${day}.${month}.${year}`;
  }

  render() {
    return `
      <li class="chats-list-item">
        {{{ ChatImage 
          imgUrl=userLogo
          size="medium" 
        }}}
        <div class="chats-list-item__content">
          <div class="chats-list-item__name">{{userName}}</div>
          <div class="chats-list-item__message">
            <div class="chats-list-item__sender">{{lastMessageSender}}:</div>
            {{lastMessage}}
          </div>
        </div>

        <div class="chats-list-item__side">
          <div class="chats-list-item__date">${this.getDate()}</div>
          {{#if unread}}
            <div class="chats-list-item__unread">{{unread}}</div>
          {{/if}}
        </div>
      </li>
    `;
  }
}

export default ChatsListItem;
