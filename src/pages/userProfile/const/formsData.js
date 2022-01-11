const userInfoFormData = {
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

const passwordChangeFormData = {
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

const FORMS = {
  USER_INFO_FORM: 'USER_INFO_FORM',
  PASSWORD_CHANGE_FORM: 'PASSWORD_CHANGE_FORM'
};

export {
  FORMS,
  passwordChangeFormData,
  userInfoFormData
};