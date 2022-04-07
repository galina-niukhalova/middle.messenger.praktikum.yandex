import classnames from 'helpers/classnames';
import Block from 'utils/Block';
import { IInputProps, InputVariants } from './types';
import './input.style.scss';

class Input extends Block {
  constructor(props: IInputProps) {
    const {
      onBlur,
      onFocus,
      onChange,
      ...rest
    } = props;

    super({
      ...rest,
      events: {
        blur: onBlur,
        focus: onFocus,
        input: onChange,
      },
    });
  }

  render() {
    const className = classnames({
      [this.props.className]: !!this.props.className,
      input_invalid: !!this.props.invalid,
      input_filled: this.props.variant === InputVariants.FILLED,
    });

    return `
      <input 
        {{#if value}}
          value="{{value}}"
        {{/if}}
        {{#if id}}
          id="{{id}}"
        {{/if}}
        {{#if accept}}
          accept="{{accept}}"
        {{/if}}
        class="input ${className}"
        type={{type}} 
        name={{name}} 
        required 
        placeholder={{placeholder}}
        {{#if readonly}} readonly {{/if}}>
  `;
  }
}

export default Input;
