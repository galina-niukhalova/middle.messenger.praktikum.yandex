import Block from 'utils/Block';
import './chatsListItem.style.scss';
import { IChatsListItemProps } from './types';

class ChatsListItem extends Block {
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
      <li class="chatsListItem">
        {{{ ChatImage 
          imgUrl=userLogo
          size="medium" 
        }}}
        <div class="chatsListItem__content">
          <div class="chatsListItem__name">{{userName}}</div>
          <div class="chatsListItem__message">
            <div class="chatsListItem__sender">{{lastMessageSender}}:</div>
            {{lastMessage}}
          </div>
        </div>

        <div class="chatsListItem__side">
          <div class="chatsListItem__date">${this.getDate()}</div>
          {{#if unread}}
            <div class="chatsListItem__unread">{{unread}}</div>
          {{/if}}
        </div>
      </li>
    `;
  }
}

export default ChatsListItem;
