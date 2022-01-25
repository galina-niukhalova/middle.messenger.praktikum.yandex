import { IFormInput, ISubmitBtn, IFormLink } from 'components/form/types';

const FORM = {
  name: 'login-form',
  id: 'login',
  title: 'Вход'
};

const SUBMIT_BTN: ISubmitBtn = {
  title: 'Войти'
};

const INPUTS: Record<string, IFormInput> = {
  login: {
    id: 'login-form_login-input',
    type: 'text',
    label: 'Логин',
    errors: {
      fieldId: 'login-form_login-error',
      general: 'Неверный логин',
      emptyField: 'Укажите пожалуйста логин'
    }
  },
  password: {
    id: 'login-form_password-input',
    type: 'password',
    label: 'Пароль',
    errors: {
      fieldId: 'login-form_password-error',
      emptyField: 'Задайте пожалуйста пароль',
    }
  }
};

const NO_ACCOUNT_LINK: IFormLink = {
  url: '/signup',
  title: 'Нет аккаунта?'
};

export {
  FORM,
  INPUTS,
  SUBMIT_BTN,
  NO_ACCOUNT_LINK
};
