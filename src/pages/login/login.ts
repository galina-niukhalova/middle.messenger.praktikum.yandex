import './login.style.scss';
import Block from 'core/Block';
import { withStore, withRouter } from 'utils';
import { Router, Dispatch } from 'core';
import { login as loginService } from 'services/auth';
import { Routes } from 'const';

interface ILoginProps {
  router: Router,
  dispatch: Dispatch<AppState>,
  loginFormError: string,
  isLoading: boolean,
  formError?: () => string | null;
}

enum LoginField {
  login,
  password
}

class LoginPage extends Block<ILoginProps> {
  protected getStateFromProps() {
    this.state = {
      isFormValid: false,
      values: {
        login: '',
        password: '',
      },
      errors: {
        login: '',
        password: '',
      },
      goToSignupLink: {
        onClick: () => this.props.router.go(Routes.Signup),
        label: 'Нет аккаунта?',
      },
      handleLogin: () => {
        if (this.state.isFormValid) {
          const loginData = this.state.values;
          this.props.dispatch(loginService, loginData);
        }
      },
      handleStateChange: ({ field, value, error }: {
        field: LoginField,
        value: string,
        error: string
      }) => {
        const nextState = {
          ...this.state,
        };

        nextState.values[field] = value;
        nextState.errors[field] = error;

        let isFormValid = true;
        Object.keys(nextState.values).every((key: string) => {
          if ((!nextState.values[key]) || (nextState.values[key] && nextState.errors[key])) {
            isFormValid = false;
            return false;
          }
          return true;
        });

        nextState.isFormValid = isFormValid;

        this.setState(nextState);
      },
    };
  }

  render() {
    const { isLoading, loginFormError } = this.props;

    const inputs = (Object.keys(LoginField) as Array<keyof typeof LoginField>)
      .map((key) => ({
        name: key,
        value: this.state.values[key],
        error: this.state.errors[key],
      }));

    return `
    <div>
      {{{AuthForm
          id='login'
          name='login-form'
          title='Вход'
          ref='form'
          className='login-form'
          inputs='${JSON.stringify(inputs)}'
          submitBtn='Войти'
          link=goToSignupLink
          update=handleStateChange
          onSubmit=handleLogin
          isLoading=${isLoading}
          isFormValid=isFormValid
          formError="${loginFormError}"
        }}}
      </div>
    `;
  }
}

function mapStateToProps(state: AppState) {
  return {
    isLoading: state?.isLoading,
    loginFormError: state.loginFormError,
  };
}

export default withRouter<ILoginProps>(
  withStore<ILoginProps>(
    LoginPage,
    mapStateToProps,
  ),
);
