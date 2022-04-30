import Block from 'core/Block';
import './dropdownIcon.scss';

interface IDropdownIconProps {
  onClick: () => void,
}

interface IDropdownIconPropsWithEvents extends Omit<IDropdownIconProps, 'onClick'> {
  events: {
    click: (e: Event) => void,
  }
}

class DropdownIcon extends Block<IDropdownIconPropsWithEvents> {
  constructor(props: IDropdownIconProps) {
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
      <div class="dropdown__icon"></div>
    `;
  }
}

export default DropdownIcon;
