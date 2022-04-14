import './button.scss';
import classnames from 'helpers/classnames';
import Block from 'utils/Block';
import { ButtonVariants, ButtonTypes } from './types';

interface IButtonProps {
  id?: string,
  className?: string,
  type?: ButtonTypes,
  variant?: ButtonVariants,
  label: string,
  onClick: () => void,
}

interface IButtonPropsWithEvents extends Omit<IButtonProps, 'onClick'> {
  events: {
    click: () => void,
  }
}

class Button extends Block<IButtonPropsWithEvents> {
  constructor(props: IButtonProps) {
    const {
      onClick, variant, className, id, label, type,
    } = props;

    const buttonVariant = variant ?? ButtonVariants.CLASSIC;
    const classNames = [];
    if (className) {
      classNames.push(className);
    }

    super({
      id,
      label,
      type: type ?? ButtonTypes.BUTTON,
      variant: buttonVariant,
      className: classnames(...classNames, {
        button_link: buttonVariant === ButtonVariants.LINK,
        button: buttonVariant === ButtonVariants.CLASSIC,
      }),
      events: {
        click: onClick,
      },
    });
  }

  render() {
    return `
      <button 
        {{#if id}}{{id}}{{/if}} 
        type={{type}} 
        class="{{className}}"
      >
        {{label}}
      </button>
    `;
  }
}

export default Button;
