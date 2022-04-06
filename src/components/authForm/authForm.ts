import './authForm.scss';
import Block from 'utils/Block';
import isValid from 'helpers/formValidation';
import { IFormProps, IFormInputData, InputType } from './types';
import ERROR_MESSAGES from './const/errors';

class AuthForm extends Block {
  constructor(props: IFormProps) {
    const inputs = JSON.parse(props.inputs as string) as IFormInputData[];
    const inputsData: { [key: string]: IFormInputData } = {};
    inputs.forEach((input: IFormInputData) => {
      inputsData[input.name] = { ...input };
    });

    super({
      ...props,
      inputs,
      inputsData,
      link: props.link ? JSON.parse(props.link) : '',
    });
  }

  protected getStateFromProps(props: IFormProps) {
    const values: { [key: string]: string } = {};
    const errors: { [key: string]: string } = {};
    (props.inputs as IFormInputData[]).forEach((input: IFormInputData) => {
      values[input.name] = '';
      errors[input.name] = '';
    });

    this.state = {
      values,
      errors,
      handleError: (field: InputType): boolean => {
        const newValue = (this.refs[field].querySelector('input') as HTMLInputElement).value;
        let errorMessage;
        const dependentFieldName = this.props.inputsData[field].errors?.dependentField;
        let dependentFieldValue;
        if (dependentFieldName) {
          dependentFieldValue = (this.refs[dependentFieldName].querySelector('input') as HTMLInputElement).value;
        }
        const { emptyFieldError, generalError } = ERROR_MESSAGES[field];

        if (!newValue) {
          errorMessage = emptyFieldError || generalError;
        } else if (!isValid(field, newValue, dependentFieldValue)) {
          errorMessage = generalError;
        } else {
          errorMessage = '';
        }

        const nextState = {
          values: {
            ...this.state.values,
            [field]: newValue,
          },
          errors: {
            ...this.state.errors,
            [field]: errorMessage,
          },
        };
        this.setState(nextState);
        return errorMessage !== '';
      },
      onFocus: this.handleInputEvents.bind(this),
      onBlur: this.handleInputEvents.bind(this),
      handleSubmit: this.handleFormSubmit.bind(this),
    };
  }

  /** EVENTS */
  handleFormSubmit(e: Event) {
    e.preventDefault();

    if (!this.validateForm()) {
      console.log('Form was successfully submitted');
      this.props.onSubmit(this.state.values);
    }
  }

  handleInputEvents(e: Event) {
    if (e.target) {
      const element = e.target as HTMLInputElement;
      this.validateInput(element.name);
    }
  }

  validateForm() {
    let validationFail = false;
    this.props.inputs.forEach(({ name }: { name: string }) => {
      const isInputValid = this.validateInput(name);
      if (!isInputValid) {
        validationFail = true;
        this.state.handleError(name);
      }
    });

    return !validationFail;
  }

  validateInput(field: string) {
    let isInputValid;

    isInputValid = this.state.handleError(field) as boolean;

    const dependentField = this.props.inputsData[field]?.errors?.dependentField as [string];
    if (dependentField) {
      isInputValid = this.state.handleError(dependentField) as boolean;
    }

    return isInputValid;
  }

  render() {
    const { values, errors } = this.state;

    return `
      <form id={{id}} class="form {{className}}" novalidate>
        <div class='form__container'>
          {{#if title}}
            <h3 class='form__title'>{{title}}</h3>
          {{/if}}
          
          {{#ifEquals name "login-form"}}
            {{#if inputsData.login}}
              {{{ InputField 
                value="${values.login}"
                ref="login"
                type="text"
                name="login"
                label="Логин"
                errorMessage="${errors.login}"
                isFormInput=true
                onBlur=onBlur
              }}}
            {{/if}}

            {{#if inputsData.password}}
              {{{ InputField 
                value="${values.password}"
                ref="password"
                type="password"
                name="password"
                label="Пароль"
                errorMessage="${errors.password}"
                isFormInput=true
                onBlur=onBlur
              }}}
            {{/if}}
          {{/ifEquals}}

          {{#ifEquals name "signup-form"}}
            {{#if inputsData.email}}
              {{{ InputField 
                value="${values.email}"
                ref="email"
                type="email"
                name="email"
                label="Почта"
                errorMessage="${errors.email}"
                isFormInput=true
                onBlur=onBlur
              }}}
            {{/if}}

            {{#if inputsData.login}}
              {{{ InputField 
                value="${values.login}"
                ref="login"
                type="text"
                name="login"
                label="Логин"
                errorMessage="${errors.login}"
                isFormInput=true
                onBlur=onBlur
              }}}
            {{/if}}

            {{#if inputsData.firstName}}
              {{{ InputField 
                value="${values.firstName}"
                ref="firstName"
                type="text"
                name="firstName"
                label="Имя"
                errorMessage="${errors.firstName}"
                isFormInput=true
                onBlur=onBlur
              }}}
            {{/if}}

            {{#if inputsData.secondName}}
              {{{ InputField 
                value="${values.secondName}"
                ref="secondName"
                type="text"
                name="secondName"
                label="Фамилия"
                errorMessage="${errors.secondName}"
                isFormInput=true
                onBlur=onBlur
              }}}
            {{/if}}

            {{#if inputsData.phone}}
              {{{ InputField 
                value="${values.phone}"
                ref="phone"
                type="tel"
                name="phone"
                label="Телефон"
                errorMessage="${errors.phone}"
                isFormInput=true
                onBlur=onBlur
              }}}
            {{/if}}

            {{#if inputsData.password}}
              {{{ InputField 
                value="${values.password}"
                ref="password"
                type="password"
                name="password"
                label="Пароль"
                errorMessage="${errors.password}"
                isFormInput=true
                onBlur=onBlur
              }}}
            {{/if}}

            {{#if inputsData.repeatPassword}}
              {{{ InputField 
                value="${values.repeatPassword}"
                ref="repeatPassword"
                type="password"
                name="repeatPassword"
                label="Пароль еще раз"
                errorMessage="${errors.repeatPassword}"
                isFormInput=true
                onBlur=onBlur
              }}}
            {{/if}}
          {{/ifEquals}}
          <div class="form__container">
            {{{ Button label=submitBtn className='form__submit-btn' type='submit' onClick=handleSubmit }}}
            {{#if link}}
              {{{ Link label=link.label to=link.to size="small" }}}
            {{/if}}
          </div>
      </form>
    `;
  }
}

export default AuthForm;
