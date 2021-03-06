import Block from 'core/Block';

export interface IDropdownItemProps {
  title: string,
  onClick: () => void,
}

interface IDropdownMenuPropsWithEvents extends Omit<IDropdownItemProps, 'onClick'> {
  events: {
    click: () => void,
  }
}

class DropdownMenu extends Block<IDropdownMenuPropsWithEvents> {
  constructor(props: IDropdownItemProps) {
    const { onClick, ...rest } = props;

    super({
      ...rest,
      events: {
        click: onClick,
      },
    });
  }

  render() {
    return `
      <li class="dropdown__item">
        {{title}}
      </li>
    `;
  }
}

export default DropdownMenu;
