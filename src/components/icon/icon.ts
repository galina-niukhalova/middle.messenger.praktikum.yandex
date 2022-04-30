import { Block } from 'core';
import closeIcon from 'static/images/icon-close.svg';

interface IIconProps {
  name: IconName;
  onClick: (e: Event) => void;
}

export enum IconName {
  Close,
}

interface IIconPropsWithEvents extends Omit<IIconProps, 'onClick'> {
  events: {
    click: (e: Event) => void;
  }
}

class Icon extends Block<IIconPropsWithEvents> {
  constructor(props: IIconProps) {
    const { onClick, ...rest } = props;

    super({
      ...rest,
      events: {
        click: onClick,
      },
    });
  }

  getIcon(name: IconName) {
    switch (name) {
      case IconName.Close:
        return closeIcon;
      default:
        return '';
    }
  }

  protected render(): string {
    return `
      <img class="{{className}}" src=${this.getIcon(this.props.name)} />
    `;
  }
}

export default Icon;
