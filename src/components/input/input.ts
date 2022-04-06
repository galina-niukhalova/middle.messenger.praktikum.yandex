import classnames from 'helpers/classnames';
import Block from 'utils/Block';
import { IInputProps } from './types';

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
      input_invalid: !!this.props.invalid,
      [this.props.className]: !!this.props.className,
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
