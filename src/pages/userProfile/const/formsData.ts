import { IFormData } from '../types';

const userInfoFormData: IFormData = {
  email: {
    label: 'Почта',
    value: 'example_email'
  },
  login: {
    label: 'Логин',
  },
  'first_name': {
    label: 'Имя',
  },
  'second_name': {
    label: 'Фамилия'
  },
  'display_name': {
    label: 'Имя в чате',
  },
  phone: {
    label: 'Телефон',
  }
};

const passwordChangeFormData: IFormData = {
  oldPassword: {
    label: 'Старый пароль',
    type: 'password',
  },
  newPassword: {
    label: 'Новый пароль',
    type: 'password',
  },
  repeatPassword: {
    label: 'Повторите новый пароль',
    type: 'password',
  }
};

export {
  passwordChangeFormData,
  userInfoFormData
};
