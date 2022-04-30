import Block from 'core/Block';
import './dropdownMenu.scss';
import { IDropdownItem } from '../dropdownItem';

interface IDropdownMenuProps {
  onClick: () => void,
  items: IDropdownItem[],
}

class DropdownMenu extends Block<IDropdownMenuProps> {
  render() {
    return `
      <ul class="dropdown__menu">
        {{#each items}}
          {{{ DropdownItem title=title onClick=onClick }}}
        {{/each}}
      </ul>
    `;
  }
}

export default DropdownMenu;
