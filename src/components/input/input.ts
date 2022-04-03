import './input.scss';
import Block from 'utils/Block';
import { IInputProps } from './types';

class Input extends Block {
  constructor(props: IInputProps) {
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
    return `
      <div class='{{containerClassName}}'>
        <div class='floating-input-container'>
          <input class="input {{className}}" type={{type}} name={{name}} required placeholder='placeholder' {{#if readonly}} readonly {{/if}}>
          <span class='input__label'>{{label}}</span>
        </div>
        <span id={{errorId}} class='input__error-message input__error-message_hidden'>Error</span>
      </div>
    `;
  }
}

export default Input;
