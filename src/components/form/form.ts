import {
  getErrorMessageElement,
} from 'helpers/dom';
import './form.scss';
import Block from 'utils/Block';
import isValid from 'helpers/formValidation';
import CLASS_NAMES from './const';
import { IFormProps, IFormInputData } from './types';

class Form extends Block {
  constructor(props: IFormProps) {
    super({
      ...props,
      inputs: JSON.parse(props.inputs) as IFormInputData[],
      link: props.link ? JSON.parse(props.link) : '',
    });
  }

  componentDidMount() {
    this.element?.addEventListener('submit', this.handleFormSubmit.bind(this));
    this.element?.querySelectorAll('.input').forEach((inputElement) => {
      inputElement.addEventListener('focus', this.handleFocus.bind(this));
      inputElement.addEventListener('blur', this.handleBlur.bind(this));
    });
  }

  /** EVENTS */
  handleFormSubmit(e: Event) {
    e.preventDefault();

    if (this.validateForm()) {
      console.log('Form was successfully submitted');
      this.props.onSubmit(this.refs);
    }
  }

  getInputByName(name: string) {
    return this.props.inputs.find((el: IFormInputData) => el.name === name);
  }

  handleFocus(e: Event) {
    if (e.target) {
      const element = e.target as HTMLInputElement;
      this.validateInput(element.name);
    }
  }

  handleBlur(e: Event) {
    if (e.target) {
      const element = e.target as HTMLInputElement;
      this.validateInput(element.name);
    }
  }

  /** HELPERS */
  showErrorMessageFor(field: string, show = true) {
    const inputElement = document.getElementsByName(field)[0] as HTMLInputElement;
    const errorMessageElement = getErrorMessageElement(this.props.name, field);

    if (!errorMessageElement) return;

    if (show) {
      errorMessageElement.classList.remove(CLASS_NAMES.hiddenErrorMessage);
      const currentInput = this.props.inputs.find(el => el.name === field);
      errorMessageElement.innerHTML = !inputElement.value
        ? currentInput.errors?.emptyField ?? currentInput.errors?.general
        : currentInput.errors?.general ?? '';
      inputElement.classList.add(CLASS_NAMES.invalidInput);
    } else {
      errorMessageElement.classList.add(CLASS_NAMES.hiddenErrorMessage);
      inputElement.classList.remove(CLASS_NAMES.invalidInput);
    }
  }

  validateForm() {
    let validationFail = false;
    this.props.inputs.forEach(({ name }: { name: string }) => {
      const isInputValid = this.validateInput(name);
      if (!isInputValid) { validationFail = true; }
    });

    return !validationFail;
  }

  isInputValid(element: HTMLInputElement) {
    if (!element.value) return false;

    const inputName = element.name;
    return isValid(inputName, element.value);
  }

  validateInput(field: string) {
    const element = document.getElementsByName(field)[0] as HTMLInputElement;

    const isInputValid = this.isInputValid(element);
    this.showErrorMessageFor(field, !isInputValid);

    const dependentFields = this.props.inputs[field]?.errors?.dependentFields as [string];
    if (dependentFields) {
      dependentFields.forEach((dependentField) => {
        const dependentElement = document.getElementsByName(dependentField)[0] as HTMLInputElement;

        const isDependentInputValid = this.isInputValid(dependentElement);
        this.showErrorMessageFor(dependentField, !isDependentInputValid);
      });
    }

    return isInputValid;
  }

  render() {
    return `
      <form id={{id}} class="form {{className}}" novalidate>
        <div class='form__container'>
          {{#if title}}
            <h3 class='form__title'>{{title}}</h3>
          {{/if}}
          {{#each inputs}}
            {{{Input 
              ref=this.ref
              type=this.type
              name=this.name
              label=this.label
              errorId=this.errors.fieldId
              isFormInput=true
            }}}
          {{/each}}
          <div class="form__container">
            {{{ Button label=submitBtn className='form__submit-btn' type='submit' }}}
            {{#if link}}
              {{{ Link label=link.label to=link.to size="small" }}}
            {{/if}}
          </div>
      </form>
    `;
  }
}

export default Form;
