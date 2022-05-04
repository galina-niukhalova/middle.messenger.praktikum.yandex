import Block from 'core/Block';
import './dropdown.scss';
import { registerComponent } from 'core';
import { DropdownIcon, DropdownMenu, DropdownItem } from './components';
import { IDropdownItem } from './components/dropdownItem';

interface IDropdownProps {
  items: IDropdownItem[],
}

registerComponent(DropdownIcon, 'DropdownIcon');
registerComponent(DropdownMenu, 'DropdownMenu');
registerComponent(DropdownItem, 'DropdownItem');

interface IDropdownPropsWithEvents extends Omit<IDropdownProps, 'openDropdown'> {
}

class Dropdown extends Block<IDropdownPropsWithEvents> {
  constructor(props: IDropdownProps) {
    super({
      ...props,
    });
  }

  protected getStateFromProps() {
    this.state = {
      isOpen: false,
      toggleDropdown: this.handleToggleDropdown.bind(this, true),
    };
  }

  handleToggleDropdown(isOpen: boolean) {
    const callback = (e: Event) => {
      const { target } = e;
      const isDropdownMenu = (target as HTMLElement).classList.contains('dropdown__menu');
      const isDropdownIcon = (target as HTMLElement).classList.contains('dropdown__icon');
      if (!isDropdownMenu && !isDropdownIcon) {
        this.handleToggleDropdown(false);
      }
    };

    if (isOpen) {
      window.addEventListener('click', callback);
    } else {
      window.removeEventListener('click', callback);
    }

    this.setState({
      isOpen,
    });
  }

  render() {
    const { isOpen } = this.state;

    return `
      <div class="dropdown__container">
        {{{ DropdownIcon onClick=toggleDropdown }}}
        {{#if ${isOpen}}}
          {{{ DropdownMenu items=items }}}
        {{/if}}
      </div>
    `;
  }
}

export default Dropdown;
