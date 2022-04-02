import classnames from 'helpers/classnames';
import './profileForm.style.scss';
import Block from 'utils/Block';
import Input from 'components/input';
import { IFormInput, ISubmitBtn } from 'components/form/types';
import IProfileFormProps from './types';
import tmpl from './profileForm.tmpl.hbs';

class ProfileForm extends Block {
  constructor(props: IProfileFormProps) {
    const disabled = props.disabled ?? false;
    const defaultProps = {
      readonly: false,
      className: classnames('profile-form', {
        'profile-form_disabled': disabled,
      }),
    };

    super({
      ...defaultProps,
      ...props,
    });
  }

  initChildren() {
    // const inputs = this.props.inputs.map((input: IFormInput) => new Input({
    //   type: input.type ?? 'text',
    //   value: input.value ?? '',
    //   name: input.name,
    //   className: 'profile-form__input',
    //   label: input.label,
    //   errorId: input.errors?.fieldId,
    //   isFormInput: true,
    //   readonly: this.props.readonly,
    // }));
    // this.children.inputs = inputs;
  }

  render() {
    return this.compile(tmpl, { ...this.props });
  }
}

export default ProfileForm;
