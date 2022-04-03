import './login.style.scss';
import Block from 'utils/Block';

class Login extends Block {
  protected getStateFromProps() {
    this.state = {
      values: {
        login: '',
        password: '',
      },
      handleSubmit: (inputs: { [key: string]: HTMLElement }) => {
        const loginData = {
          login: (inputs.login.querySelector('input') as HTMLInputElement).value,
          password: (inputs.password.querySelector('input') as HTMLInputElement).value,
        };
        console.log(loginData);
      },
    };
  }

  render() {
    const inputs = [
      {
        name: 'login',
        id: 'login-form_login-input',
        type: 'text',
        label: 'Логин',
        ref: 'login',
        errors: {
          fieldId: 'login-form_login-error',
          general: 'Неверный логин',
          emptyField: 'Укажите пожалуйста логин',
        },
      },
      {
        name: 'password',
        id: 'login-form_password-input',
        type: 'password',
        label: 'Пароль',
        ref: 'password',
        errors: {
          fieldId: 'login-form_password-error',
          emptyField: 'Задайте пожалуйста пароль',
        },
      },
    ];

    const link = {
      to: '/signup',
      label: 'Нет аккаунта?',
    };

    return `
      {{{Form
          id='login'
          name='login-form'
          title='Вход'
          ref='form'
          className='login-form'
          inputs='${JSON.stringify(inputs)}'
          submitBtn='Войти'
          onSubmit=handleSubmit
          link='${JSON.stringify(link)}'
      }}}
    `;
  }
}

export default Login;
