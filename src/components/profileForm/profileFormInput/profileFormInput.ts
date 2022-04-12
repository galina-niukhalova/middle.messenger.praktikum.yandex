import Block from 'utils/Block';
import classnames from 'helpers/classnames';
import { IProfileFormInputProps } from './types';
import './profileFormInput.style.scss';

class ProfileFormInput extends Block {
  constructor(props: IProfileFormInputProps) {
    const {
      className,
    } = props;

    const defaultProps = {
      type: 'text',
      readonly: false,
    };

    const classNames = [];
    if (className) {
      classNames.push(className);
    }

    super({
      ...defaultProps,
      ...props,
      className: classnames(...classNames, 'profile-form__input', {
        'profile-form__input_invalid': Boolean(props.invalid),
      }),
      events: {
        blur: props.onBlur,
      },
    });
  }

  render() {
    return `
        <input 
          value="{{value}}"
          name={{name}} 
          class={{className}}
          type={{type}}
          {{#if readonly}}readonly{{/if}}
        ></input>
    `;
  }
}

export default ProfileFormInput;
