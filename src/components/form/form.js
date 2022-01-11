import {
  getErrorMessageElement,
} from 'utils/dom';
import './form.scss';
import { CLASS_NAMES } from './const';
import formTemplate from './form.hbs';
import Handlebars from 'handlebars/dist/handlebars.runtime';

Handlebars.registerHelper('form', function (options) {
  const { hash } = options || {};
  if (!hash) return;

  const { data } = hash;

  const formHTML = formTemplate({
    ...data,
  });

  return new Handlebars.SafeString(formHTML);
});
class Form {
  formWasSubmitted = false;

  constructor(id, name, inputs) {
    this.id = id;
    this.name = name;
    this.inputs = inputs;
  }

  /** EVENTS */
  listenFormSubmission(onFormSubmit) {
    document.getElementById(this.id).addEventListener('submit', (event) => {
      event.preventDefault();
      this.formWasSubmitted = true;

      if (this.validateForm()) {
        console.log('Form was successfully submitted');
        onFormSubmit();
      }
    });
  }

  listenInputsChange() {
    document.getElementById(this.id).addEventListener('input', ({ target }) => {
      this.formWasSubmitted && this.validateInput(target.name);
    });
  }

  /** HELPERS */
  showErrorMessageFor(field, show = true) {
    const inputElement = document.getElementsByName(field)[0];
    const errorMessageElement = getErrorMessageElement(this.name, field);
    if (!errorMessageElement) return;

    if (show) {
      errorMessageElement.classList.remove(CLASS_NAMES.hiddenErrorMessage);
      errorMessageElement.innerHTML = !inputElement.value
        ? this.inputs[field].errors.emptyField
        : this.inputs[field].errors.general;
      inputElement.classList.add(CLASS_NAMES.invalidInput);
    } else {
      errorMessageElement.classList.add(CLASS_NAMES.hiddenErrorMessage);
      inputElement.classList.remove(CLASS_NAMES.invalidInput);
    }
  }

  validateForm() {
    let validationFail = false;

    Object.keys(this.inputs).forEach(inputName => {
      if (!this.isInputValid(inputName)) {
        this.showErrorMessageFor(inputName, true);
        validationFail = true;
      }
    });

    return !validationFail;
  }

  isInputValid(inputName) {
    const inputElement = document.getElementsByName(inputName)[0];

    if (!inputElement.value) return false;

    if (this.inputs[inputName].errors.customValidator) {
      return this.inputs[inputName].errors.customValidator();
    }

    return inputElement.validity.valid;
  }

  validateInput(field) {
    !this.isInputValid(field)
      ? this.showErrorMessageFor(field, true)
      : this.showErrorMessageFor(field, false);

    const dependentFields = this.inputs[field].errors.dependentFields;
    if (dependentFields) {
      dependentFields.forEach(dependentField => {
        !this.isInputValid(dependentField)
          ? this.showErrorMessageFor(dependentField, true)
          : this.showErrorMessageFor(dependentField, false);
      });
    }
  }
}

export default Form;