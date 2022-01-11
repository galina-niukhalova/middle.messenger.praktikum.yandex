const FORM = {
  name: 'login-form',
  id: 'login',
  title: 'Вход'
};

const SUBMIT_BTN = {
  title: 'Войти'
};

const INPUTS = {
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

const NO_ACCOUNT_LINK = {
  url: '/signup',
  title: 'Нет аккаунта?'
};

export {
  FORM,
  INPUTS,
  SUBMIT_BTN,
  NO_ACCOUNT_LINK
};