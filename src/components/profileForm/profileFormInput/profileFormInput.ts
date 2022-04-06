import Block from 'utils/Block';
import classnames from 'helpers/classnames';
import { IProfileFormInputProps } from './types';
import './profileFormInput.style.scss';

class ProfileFormInput extends Block {
  constructor(props: IProfileFormInputProps) {
    const defaultProps = {
      type: 'text',
      readonly: false,
    };

    super({
      ...defaultProps,
      ...props,
      events: {
        blur: props.onBlur,
      },
    });
  }

  render() {
    const className = classnames('profile-form__input', {
      'profile-form__input_invalid': this.props.invalid,
    });

    return `
        <input 
          value="{{value}}"
          name={{name}} 
          class="${className}"
          type={{type}}
          {{#if readonly}}readonly{{/if}}
        ></input>
    `;
  }
}

export default ProfileFormInput;
