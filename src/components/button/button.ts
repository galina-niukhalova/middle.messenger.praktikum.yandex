import './button.scss';
import classnames from 'helpers/classnames';
import Block from 'utils/Block';
import tmpl from './button.hbs';
import { IButtonProps, ButtonVariants } from './types';

class Button extends Block {
  constructor(props: IButtonProps) {
    const variant = props.variant ?? ButtonVariants.CLASSIC;
    const classNames = [];
    if (props.className) classNames.push(props.className);

    const defaultProps = {
      type: 'button',
      variant,
    };

    super({
      ...defaultProps,
      ...props,
      className: classnames(...classNames, {
        button_link: variant === ButtonVariants.LINK,
        button: variant === ButtonVariants.CLASSIC,
      }),
    });
  }

  render() {
    return this.compile(tmpl, { ...this.props });
  }
}

export default Button;
