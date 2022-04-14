import classnames from 'helpers/classnames';
import './profileForm.style.scss';
import Block from 'utils/Block';
import registerComponent from 'utils/registerComponent';
import isValid from 'helpers/formValidation';
import { IFormInputData } from './types';
import { ProfileFormInput } from './profileFormInput';

registerComponent(ProfileFormInput, 'ProfileFormInput');

interface IProfileFormComponentProps {
  id: string,
  name: string,
  className: string,
  inputs: string,
  readonly?: boolean,
  disabled?: boolean,
  onSubmit: (values: Record<string, string>) => void,
  updateErrors: (field: string, newValue: string, isValid?: boolean) => void;
}

interface IProfileFormProps extends Omit<IProfileFormComponentProps, 'inputs'> {
  inputs: IFormInputData[]
}

class ProfileForm extends Block<IProfileFormProps> {
  constructor(props: IProfileFormComponentProps) {
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
      inputs: JSON.parse(props.inputs),
    });
  }

  protected getStateFromProps() {
    this.state = {
      handleSubmit: (e: Event) => {
        e.preventDefault();
        const values: Record<string, string> = {};
        this._element?.querySelectorAll('input').forEach((inputElement: HTMLInputElement) => {
          values[inputElement.name] = inputElement.value;
        });

        if (this.validateForm(values)) {
          this.props.onSubmit(values);
        }
      },
    };
  }

  getFormInputs() {
    const { readonly } = this.props;

    let inputsString = '';
    this.props.inputs.forEach((input: IFormInputData) => {
      const rowClassName = classnames('profile-form__row', {
        'profile-form__row_invalid': input.invalid,
      });

      inputsString += `
          <li class='${rowClassName}'>
            <label class='profile-form__label'>${input.label}</label>
            {{{ ProfileFormInput 
                ref=${input.name}
                value="${input.value}"
                name="${input.name}"
                type="${input.type || 'text'}"
                readonly=${readonly}
                invalid=${input.invalid}
            }}}
        </li>
        `;
    });

    return inputsString;
  }

  validateInput(field: string, values: { [key: string]: string }, dependentField?: string) {
    let isInputValid = true;
    if (!values[field] || !isValid(field, values[field])) {
      isInputValid = false;
    }

    if (dependentField) {
      const isDependentFieldValid = isValid(dependentField, values[dependentField], values[field]);
      this.props.updateErrors(dependentField, values[dependentField], isDependentFieldValid);
    }

    return isInputValid;
  }

  validateForm(values: Record<string, string>) {
    let validationFail = false;

    Object.keys(values).forEach((name) => {
      const currentInput = this.props.inputs
        .find((input: IFormInputData) => input.name === name);
      const { dependentField } = currentInput?.errors || {};

      if (dependentField) {
        const isInputValid = this.validateInput(name, values, dependentField);
        if (!isInputValid) {
          validationFail = true;
          this.props.updateErrors(name, values[name]);
        } else {
          this.props.updateErrors(name, values[name], true);
        }
      }
    });

    return !validationFail;
  }

  render() {
    return `
      <form class='{{className}}' id={{id}}>
        <ul class='profile-form__rows'>
          ${this.getFormInputs()}
        </ul>
        {{#unless readonly}}
          <div class='profile-form__submit-button-wrap'>
            {{{ Button 
              label="Сохранить" 
              className="profile-form__submit-btn"
              type="submit" 
              onClick=handleSubmit
            }}}
          </div>
        {{/unless}}
      </form>
    `;
  }
}

export default ProfileForm;
