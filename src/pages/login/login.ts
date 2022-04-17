import './login.style.scss';
import Block from 'core/Block';
import withStore from 'utils/withStore';
import AuthController from 'controllers/AuthController';

const controller = new AuthController();

interface ILoginProps {
  isLoading: boolean,
}
class LoginPage extends Block<ILoginProps> {
  protected getStateFromProps() {
    this.state = {
      handleSubmit: (values: { login: string, password: string }) => {
        console.log('submit', values);
        controller.logout();
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

function mapLoginToProps(state: GlobalState) {
  return {
    isLoading: state?.isLoading,
  };
}

export default withStore<ILoginProps>(
  LoginPage,
  mapLoginToProps,
);
