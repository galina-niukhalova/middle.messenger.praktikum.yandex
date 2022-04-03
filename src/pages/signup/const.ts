import { IFormInput } from 'components/form/types';
import {
  isEmailValid,
  isLoginValid,
  isNameValid,
  isPhoneValid,
  isPasswordValid,
  isRepeatPasswordValid,
} from 'helpers/formValidation';

const FORM = {
  name: 'signup-form',
  id: 'signup',
  title: 'Регистрация',
};

const SUBMIT_BTN = {
  label: 'Зарегистрироваться',
};

const INPUTS: Record<string, IFormInput> = {
  email: {
    id: 'signup-form_email-input',
    type: 'email',
    label: 'Почта',
    isValid: isEmailValid,
    errors: {
      fieldId: 'signup-form_email-error',
      general: 'Неверная почта',
      emptyField: 'Укажите пожалуйста почту',
    },
  },
  login: {
    id: 'signup-form_login-input',
    type: 'text',
    label: 'Логин',
    isValid: isLoginValid,
    errors: {
      fieldId: 'signup-form_login-error',
      emptyField: 'Укажите пожалуйста логин',
    },
  },
  'first-name': {
    id: 'signup-form_first-name-input',
    type: 'text',
    label: 'Имя',
    isValid: isNameValid,
    errors: {
      fieldId: 'signup-form_first-name-error',
      emptyField: 'Укажите пожалуйста имя',
    },
  },
  'second-name': {
    id: 'signup-form_second-name-input',
    type: 'text',
    label: 'Фамилия',
    isValid: isNameValid,
    errors: {
      fieldId: 'signup-form_second-name-error',
      emptyField: 'Укажите пожалуйста фамилию',
    },
  },
  phone: {
    id: 'signup-form_phone-input',
    type: 'tel',
    label: 'Телефон',
    isValid: isPhoneValid,
    errors: {
      fieldId: 'signup-form_phone-error',
      emptyField: 'Укажите пожалуйста телефон',
    },
  },
  password: {
    id: 'signup-form_password-input',
    type: 'password',
    label: 'Пароль',
    isValid: isPasswordValid,
    errors: {
      fieldId: 'signup-form_password-error',
      emptyField: 'Поле обязательное для заполнения',
      general: 'Пароли не совпадают',
      dependentFields: ['repeat-password'],
    },
  },
  'repeat-password': {
    id: 'signup-form_repeat-password-input',
    type: 'password',
    label: 'Пароль еще раз',
    isValid: isRepeatPasswordValid,
    errors: {
      fieldId: 'signup-form_repeat-password-error',
      general: 'Пароли не совпадают',
      emptyField: 'Поле обязательное для заполнения',
      dependentFields: ['password'],
    },
  },
};

const LOGIN_LINK = {
  url: '/login',
  label: 'Войти',
};

export {
  FORM,
  INPUTS,
  SUBMIT_BTN,
  LOGIN_LINK,
};
