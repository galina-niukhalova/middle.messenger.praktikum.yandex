import {
  getErrorMessageElement,
} from 'helpers/dom';
import './form.scss';
import Block from 'utils/Block';
import Input from 'components/input';
import Button from 'components/button';
import Link from 'components/link';
import CLASS_NAMES from './const';
import formTemplate from './form.hbs';
import { IFormProps, IFormInputData } from './types';

class Form extends Block {
  formWasSubmitted;

  constructor(props: IFormProps) {
    const defaultProps = {
      readonly: false,
    };

    super({
      ...defaultProps,
      ...props,
    });

    this.formWasSubmitted = false;
  }

  initChildren() {
    const inputs = this.props.inputs.map((input: IFormInputData) => new Input({
      type: input.type,
      name: input.name,
      label: input.label,
      errorId: input.errors?.fieldId,
      isFormInput: true,
    }));
    this.children.inputs = inputs;

    this.children.submitBtn = new Button({
      ...this.props.submitBtn,
      className: 'form__submit-btn',
      type: 'submit',
    });

    if (this.props.link) {
      this.children.link = new Link({
        ...this.props.link,
        size: 'small',
      });
    }
  }

  componentDidMount() {
    this.element?.addEventListener('submit', this.handleFormSubmit.bind(this));
    this.element?.addEventListener('input', this.handleInputChange.bind(this));
  }

  /** EVENTS */
  handleFormSubmit(e: Event) {
    e.preventDefault();
    this.formWasSubmitted = true;

    if (this.validateForm()) {
      console.log('Form was successfully submitted');
      this.props.onFormSubmit();
    }
  }

  handleInputChange(e: Event) {
    const { target } = e;
    if (target instanceof HTMLInputElement) {
      if (this.formWasSubmitted) {
        this.validateInput(target.name);
      }
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
    this.props.inputs.forEach(({ name }) => {
      if (!this.isInputValid(name)) {
        this.showErrorMessageFor(name, true);
        validationFail = true;
      }
    });

    return !validationFail;
  }

  isInputValid(inputName: string) {
    const inputElement = document.getElementsByName(inputName)[0] as HTMLInputElement;

    if (!inputElement.value) return false;

    const targetInput = this.props.inputs.find((el) => el.name === inputName);
    if (targetInput?.errors?.customValidator) {
      return targetInput!.errors!.customValidator!();
    }

    return inputElement.validity.valid;
  }

  validateInput(field: string) {
    if (!this.isInputValid(field)) {
      this.showErrorMessageFor(field, true);
    } else {
      this.showErrorMessageFor(field, false);
    }

    const dependentFields = this.props.inputs[field]?.errors?.dependentFields as [string];
    if (dependentFields) {
      dependentFields.forEach((dependentField) => {
        if (!this.isInputValid(dependentField)) {
          this.showErrorMessageFor(dependentField, true);
        } else {
          this.showErrorMessageFor(dependentField, false);
        }
      });
    }
  }

  render() {
    return this.compile(formTemplate, { ...this.props });
  }
}

export default Form;
