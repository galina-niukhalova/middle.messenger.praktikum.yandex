import { Block } from 'core';
import './deleteUser.scss';
import 'components/modal/modal.scss';
import { IconName } from 'components/icon';

interface IDeleteUserProps {
  close: () => void,
  users: User[],
  deleteUser: (id: number) => void,
}

class DeleteUser extends Block<IDeleteUserProps> {
  protected getStateFromProps() {
    this.state = {
      onUserClick: this.handleUserClick.bind(this),
    };
  }

  handleUserClick(e: Event) {
    const button = e.target as HTMLElement;
    const { id } = button.dataset;

    if (id) {
      this.props.deleteUser(parseInt(id, 10));
    }
  }

  render() {
    return `
      <div>
        <div class="modal__backdrop"></div>
        <div class="modal">
          {{{ Icon className="modal__close" name=${IconName.Close} onClick=close }}}
          <h2 class="modal__title">Удалить пользователя</h2>
          {{#if ${this.props.users.length > 0}}}
            <div class="delete-user__users-list">
              ${this.props.users.map((user: User) => `
                {{{ Button label="${user.login}" dataId=${user.id} onClick=onUserClick }}}
              `).join('')}
            </div>
          {{/if}}
        </div>
      </div>
    `;
  }
}

export default DeleteUser;
