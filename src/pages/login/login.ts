import './login.style.scss';
import Block from 'utils/Block';

class Login extends Block {
  protected getStateFromProps() {
    this.state = {
      handleSubmit: (values: { login: string, password: string }) => {
        console.log('submit', values);
      },
    };
  }

  render() {
    const inputs = [
      { name: 'login' },
      { name: 'password' },
    ];

    const link = {
      to: '/signup',
      label: 'Нет аккаунта?',
    };

    return `
      {{{AuthForm
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
