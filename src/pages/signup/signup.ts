import Block from 'core/Block';
import './signup.style.scss';
import { withStore, withRouter } from 'utils';
import { Router, Dispatch } from 'core';
import { signup } from 'services/auth';
import { Routes } from 'const';

interface ISignupProps {
  router: Router,
  isLoading: boolean,
  signupFormError: string,
  formError?: () => string | null,
  dispatch: Dispatch<AppState>
}

enum SignupField {
  email = 'email',
  login = 'login',
  firstName = 'firstName',
  secondName = 'secondName',
  phone = 'phone',
  password = 'password',
  repeatPassword = 'repeatPassword'
}
class Signup extends Block<ISignupProps> {
  protected getStateFromProps() {
    const values: Record<string, string> = {};
    const errors: Record<string, string> = {};

    (Object.keys(SignupField) as Array<keyof typeof SignupField>).map((key) => {
      values[key] = '';
      errors[key] = '';
    });
    this.state = {
      isFormValid: false,
      values,
      errors,
      goToLoginLink: {
        onClick: () => this.props.router.go(Routes.Login),
        label: 'Войти',
      },
      handleSignup: () => {
        if (this.state.isFormValid) {
          const signupData = this.state.values;
          this.props.dispatch(signup, signupData);
        }
      },
      handleStateChange: ({ field, value, error }: {
        field: SignupField,
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
    const { isLoading, signupFormError } = this.props;

    const inputs = (Object.keys(SignupField) as Array<keyof typeof SignupField>)
      .map((key) => ({
        name: key,
        value: this.state.values[key],
        error: this.state.errors[key],
      }));

    return `
      {{{AuthForm
          id='signup'
          name='signup-form'
          title='Регистрация'
          ref='form'
          className='signup-form'
          inputs='${JSON.stringify(inputs)}'
          submitBtn='Зарегистрироваться'
          onSubmit=handleSignup
          link=goToLoginLink
          update=handleStateChange
          formError="${signupFormError}"
          isLoading=${isLoading}
          isFormValid=isFormValid
      }}}
    `;
  }
}

function mapStateToProps(state: AppState) {
  return {
    isLoading: state.isLoading,
    signupFormError: state.signupFormError,
  };
}

export default withRouter<ISignupProps>(
  withStore<ISignupProps>(
    Signup,
    mapStateToProps,
  ),
);
