import './button.scss';
import classnames from 'helpers/classnames';
import Block from 'core/Block';
import { SpinnerSize } from 'components/spinner';
import { ButtonVariants, ButtonTypes } from './types';

interface IButtonProps {
  id?: string,
  className?: string,
  type?: ButtonTypes,
  variant?: ButtonVariants,
  label: string,
  isLoading: boolean,
  disabled: boolean,
  onClick: () => void,
  dataId: string
}

interface IButtonPropsWithEvents extends Omit<IButtonProps, 'onClick'> {
  events: {
    click: () => void,
  }
}

class Button extends Block<IButtonPropsWithEvents> {
  constructor(props: IButtonProps) {
    const {
      onClick, variant, className, id, label, type, isLoading = false, disabled,
      dataId,
    } = props;

    const buttonVariant = variant ?? ButtonVariants.CLASSIC;
    const classNames = [];
    if (className) {
      classNames.push(className);
    }

    super({
      id,
      label,
      isLoading,
      disabled,
      dataId,
      type: type ?? ButtonTypes.BUTTON,
      variant: buttonVariant,
      className: classnames(...classNames, {
        button_link: buttonVariant === ButtonVariants.LINK,
        button: buttonVariant === ButtonVariants.CLASSIC,
        button_loading: isLoading,
      }),
      events: {
        click: onClick,
      },
    });
  }

  render() {
    const { isLoading } = this.props;

    return `
      <button 
        {{#if id}}{{id}}{{/if}} 
        type={{type}} 
        class="{{className}}"
        {{#if disabled}}
          disabled
        {{/if}}
        {{#if dataId}}
          data-id="{{dataId}}"
        {{/if}}
      >
        {{#if ${isLoading === true}}} 
          {{{ Spinner size=${SpinnerSize.sm} }}} 
        {{else}}
          {{ label }}  
        {{/if}}
      </button>
    `;
  }
}

export default Button;
