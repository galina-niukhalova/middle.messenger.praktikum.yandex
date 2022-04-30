import './chatsList.style.scss';
import Block from 'core/Block';
import { InputVariants } from 'components/input/types';
import { LinkVariants } from 'components/link/types';
import { registerComponent, Router, Dispatch } from 'core';
import classnames from 'helpers/classnames';
import { Routes } from 'const';
import { withStore, withRouter } from 'utils';
import {
  createChat,
  getChats,
  deleteChat,
  searchUser,
  addUserToChat,
  getChatUsers,
  deleteUserFromChat,
} from 'services/chats';
import { IDropdownItem } from 'components/dropdown/components/dropdownItem';
import {
  ChatImage,
  ChatsList,
  AddChat,
  AddUser,
  DeleteUser,
} from './components';
import { IChatMessage } from './types';

registerComponent(ChatImage, 'ChatImage');
registerComponent(ChatsList, 'ChatsList');
registerComponent(AddChat, 'AddChat');
registerComponent(AddUser, 'AddUser');
registerComponent(DeleteUser, 'DeleteUser');

interface IChatsProps {
  chats: Chat[],
  searchResult: User[],
  dispatch: Dispatch<AppState>
  router: Router,
  chatMenu: IDropdownItem[],
}

class ChatsPage extends Block<IChatsProps> {
  constructor(props: IChatsProps) {
    super({
      ...props,
    });

    const chatMenu = [
      {
        title: 'Добавить пользователя',
        onClick: () => this.toggleAddUserWindow(true),
      },
      {
        title: 'Удалить пользователя',
        onClick: () => this.toggleDeleteUserWindow(true),
      },
      {
        title: 'Удалить чат',
        onClick: () => this.handleDeleteChat(),
      },
    ];

    this.setProps({
      ...this.props,
      chatMenu,
    });

    this.props.dispatch(getChats);
  }

  isMessageEmpty(value: string) {
    return value === '';
  }

  protected getStateFromProps() {
    this.state = {
      activeChat: null,
      showCreateChatWindow: false,
      showAddUserWindow: false,
      showDeleteUserWindow: false,
      onChatClick: this.handleChatClick.bind(this),
      onMessageSend: this.handleMessageSend.bind(this),
      goToProfilePage: () => this.props.router.go(Routes.Profile),
      onCreateChatOpen: this.toggleCreateChatWindow.bind(this, true),
      onCreateChatClose: this.toggleCreateChatWindow.bind(this, false),
      onAddUserOpen: this.toggleAddUserWindow.bind(this, true),
      onAddUserClose: this.toggleAddUserWindow.bind(this, false),
      onDeleteUserOpen: this.toggleDeleteUserWindow.bind(this, true),
      onDeleteUserClose: this.toggleDeleteUserWindow.bind(this, false),
      createChat: (title: string) => this.props.dispatch(createChat, { title }),
      searchUser: (login: string) => {
        this.props.dispatch(searchUser, { login, chatId: this.state.activeChat.id });
      },
      addUser: this.handleAddUser.bind(this),
      deleteUser: this.handleDeleteUser.bind(this),
    };
  }

  handleAddUser(id: number) {
    this.props.dispatch(addUserToChat, {
      users: [id],
      chatId: this.state.activeChat.id,
    });
    this.toggleAddUserWindow(false);
  }

  handleDeleteUser(userId: number) {
    this.props.dispatch(deleteUserFromChat, {
      users: [
        userId,
      ],
      chatId: this.state.activeChat.id,
    });

    this.setState({
      ...this.state,
      showDeleteUserWindow: false,
    });
  }

  handleDeleteChat() {
    this.props.dispatch(deleteChat, { chatId: this.state.activeChat.id });
    this.setState({
      ...this.state,
      activeChat: null,
    });
  }

  handleMessageSend() {
    const inputElement = document.querySelector('.chat__footer input') as HTMLInputElement;

    if (!this.isMessageEmpty(inputElement.value)) {
      inputElement.value = '';
    }
  }

  handleChatClick(chatId: number) {
    const currentChat = this.props.chats
      .find((chat: Chat) => chat.id === chatId) as Chat;

    this.props.dispatch(getChatUsers, {
      chatId,
    });

    const newState = {
      ...this.state,
      activeChat: currentChat,
    };

    this.setState(newState);
  }

  toggleCreateChatWindow(isOpen: boolean) {
    this.setState({
      ...this.state,
      showCreateChatWindow: isOpen,
    });
  }

  toggleAddUserWindow(isOpen: boolean) {
    this.setState({
      ...this.state,
      showAddUserWindow: isOpen,
    });
    this.props.dispatch({
      searchResult: [],
    });
  }

  toggleDeleteUserWindow(isOpen: boolean) {
    this.setState({
      ...this.state,
      showDeleteUserWindow: isOpen,
    });
  }

  getChatsList() {
    let chatsListString = '';
    this.props.chats?.forEach((chat: Chat) => {
      //   const lastMessage = chat.history[chat.history.length - 1];
      //   const totalUnread = chat.history.reduce((prev: number, current: IChatMessage) => {
      //     if (!current.read) {
      //       return prev + 1;
      //     }
      //     return prev;
      //   }, 0);

      chatsListString += `
          {{{ ChatsListItem
                id="${chat.id}"
                title="${chat.title}"
                onChatClick=onChatClick
          }}}
        `;
    });

    // userLogo="${chat.user.logo}"
    //             lastMessage="${lastMessage.message}"
    //             lastMessageDate="${lastMessage.date}"
    //             lastMessageSender="${lastMessage.senderId === chat.user.id ? chat.user.name : 'Вы'}"
    //             unread=${totalUnread}

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
    const { activeChat } = this.state;

    return `
      <div class="chats">
        {{#if showCreateChatWindow}}
          {{{ AddChat close=onCreateChatClose createChat=createChat }}}
        {{/if}}
        {{#if showAddUserWindow }}
          {{{ AddUser close=onAddUserClose searchUser=searchUser searchResult=searchResult addUser=addUser }}}
        {{/if}}
        {{#if showDeleteUserWindow }}
          {{{ DeleteUser close=onDeleteUserClose users=chatUsers deleteUser=deleteUser }}}
        {{/if}}
        <aside class="sidebar">
          <header class="sidebar__header">
            {{{ Link size="medium" label="Профиль" variant=${LinkVariants.NAV} onClick=goToProfilePage }}}
          </header>
          <div class="sidebar__search">
            {{{ Input variant=${InputVariants.FILLED} placeholder="Поиск" }}}
          </div>
          {{{ ChatsList chats=chats onChatClick=onChatClick activeChat=activeChat }}}
          <div class="sidebar__footer">
            {{{ Button label="Новый чат" onClick=onCreateChatOpen }}}
          </div>
        </aside>
        {{#if activeChat}}
          <main class="chat">
            <header class="chat__header">
              <div class="chat__header_left">
                {{{ ChatImage size="small" imgUrl="${activeChat?.avatar}" }}}
                <span>${activeChat?.title}</span>
              </div>
              <div class="chat__header_right">
                {{{ Dropdown items=chatMenu }}}
              </div>
            </header>
            <div class="chat__window">
              Hi
            </div>
            <footer class="chat__footer">
              {{{ Input variant=${InputVariants.FILLED} placeholder="Сообщение" }}}
              {{{ Button onClick=onMessageSend }}}
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

function mapStateToProps(state: AppState) {
  return {
    chats: state.chats,
    searchResult: state.searchResult,
    chatUsers: state.chatUsers,
  };
}

export default withRouter<IChatsProps>(
  withStore<IChatsProps>(
    ChatsPage,
    mapStateToProps,
  ),
);
