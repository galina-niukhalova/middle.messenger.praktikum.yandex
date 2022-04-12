import './button.scss';
import classnames from 'helpers/classnames';
import Block from 'utils/Block';
import { IButtonProps, ButtonVariants } from './types';

class Button extends Block {
  constructor(props: IButtonProps) {
    const {
      onClick, variant, className, ...rest
    } = props;

    const buttonVariant = variant ?? ButtonVariants.CLASSIC;
    const classNames = [];
    if (className) {
      classNames.push(className);
    }

    const defaultProps = {
      type: 'button',
      variant: buttonVariant,
      className: classnames(...classNames, {
        button_link: buttonVariant === ButtonVariants.LINK,
        button: buttonVariant === ButtonVariants.CLASSIC,
      }),
    };

    super({
      ...defaultProps,
      ...rest,
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
