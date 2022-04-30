import { Block } from 'core';
import './addUser.scss';
import 'components/modal/modal.scss';
import { IconName } from 'components/icon';
import { InputVariants } from 'components/input/types';

interface IAddUserProps {
  close: () => void,
  searchUser: (login: string) => void,
  searchResult: User[],
  addUser: (id: number) => void,
}

class AddUser extends Block<IAddUserProps> {
  protected getStateFromProps() {
    this.state = {
      onUserSearchClick: this.handleUserSearch.bind(this),
      onUserClick: this.handleUserClick.bind(this),
    };
  }

  handleUserSearch(e: Event) {
    e.preventDefault();

    const input = this.refs.name as HTMLInputElement;

    if (input) {
      this.props.searchUser(input.value);
    }
  }

  handleUserClick(e: Event) {
    const button = e.target as HTMLElement;
    const { id } = button.dataset;

    if (id) {
      this.props.addUser(parseInt(id, 10));
    }
  }

  render() {
    return `
      <div>
        <div class="modal__backdrop"></div>
        <div class="modal">
          {{{ Icon className="modal__close" name=${IconName.Close} onClick=close }}}
          <h2 class="modal__title">Добавить пользователя в чат</h2>
          {{#if ${this.props.searchResult.length > 0}}}
            <div class="add-user__search-result">
              ${this.props.searchResult.map((user: User) => `
                {{{ Button label="${user.login}" dataId=${user.id} onClick=onUserClick }}}
              `).join('')}
            </div>
          {{else}}
            <form class="search-user-form">
              {{{ Input ref="name" className="search-user-input" variant=${InputVariants.FILLED} placeholder="Поиск по логину" }}}
              {{{ Button label="Применить" className="search-user-submit-button" type="submit" onClick=onUserSearchClick }}}
            </form>
          {{/if}}
        </div>
      </div>
    `;
  }
}

export default AddUser;
