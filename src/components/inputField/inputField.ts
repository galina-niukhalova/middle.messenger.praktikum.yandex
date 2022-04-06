import './inputField.scss';
import Block from 'utils/Block';
import classnames from 'helpers/classnames';
import { IInputFieldProps } from './types';

class InputField extends Block {
  constructor(props: IInputFieldProps) {
    const isFormInput = props.isFormInput ?? false;
    const defaultProps = {
      type: 'text',
      isFormInput,
      containerClassName: isFormInput ? 'form__input-container' : '',
      readonly: false,
    };

    super({
      ...defaultProps,
      ...props,
    });
  }

  render() {
    const errorClassName = classnames('input__error-message', {
      'input__error-message_hidden': !this.props.errorMessage,
    });

    return `
      <div class='{{containerClassName}}' >
        <div class='floating-input-container' >
          {{{ Input 
              value=value
              className=className
              type=type
              name=name
              placeholder=placeholder
              readonly=readonly
              onFocus=onFocus
              onBlur=onBlur
              invalid=${!!this.props.errorMessage}
          }}}
          <span class='input__label'>{{label}}</span>
        </div>
      <span class="${errorClassName}">{{errorMessage}}</span>
    </div>
    `;
  }
}

export default InputField;
