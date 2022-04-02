import './input.scss';
import compile from 'components/utils/compile';
import Block from 'utils/Block';
import { IInputProps } from './types';
import tmpl from './input.hbs';

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
    return compile(tmpl, { ...this.props });
  }
}

export default Input;
