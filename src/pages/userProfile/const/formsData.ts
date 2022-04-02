import { IFormData } from '../types';

const userInfoFormData: IFormData = {
  email: {
    id: 'user-info-form__email',
    label: 'Почта',
    value: 'example_email',
  },
  login: {
    id: 'user-info-form__login',
    label: 'Логин',
  },
  first_name: {
    id: 'user-info-form__first-name',
    label: 'Имя',
  },
  second_name: {
    id: 'user-info-form__second-name',
    label: 'Фамилия',
  },
  display_name: {
    id: 'user-info-form__display-name',
    label: 'Имя в чате',
  },
  phone: {
    id: 'user-info-form__phone',
    label: 'Телефон',
  },
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
  },
};

export {
  passwordChangeFormData,
  userInfoFormData,
};
