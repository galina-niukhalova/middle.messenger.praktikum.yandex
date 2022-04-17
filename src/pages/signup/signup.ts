import Block from 'core/Block';
import './signup.style.scss';

class Signup extends Block<{}> {
  protected getStateFromProps() {
    this.state = {
      handleSubmit: (values: { [key: string]: string }) => {
        const mapFieldToApi: { [key: string]: string } = {
          email: 'email',
          login: 'login',
          firstName: 'first-name',
          secondName: 'second-name',
          phone: 'phone',
          password: 'passoword',
        };

        const newValues: { [key: string]: string } = {};
        Object.keys(mapFieldToApi).forEach((key: string) => {
          newValues[mapFieldToApi[key]] = values[key];
        });

        console.log('submit', newValues);
      },
    };
  }

  render() {
    const inputs = [
      { name: 'email' },
      { name: 'login' },
      { name: 'firstName' },
      { name: 'secondName' },
      { name: 'phone' },
      {
        name: 'password',
        errors: {
          dependentField: 'repeatPassword',
        },
      },
      {
        name: 'repeatPassword',
        errors: {
          dependentField: 'password',
        },
      },
    ];

    const link = {
      to: '/login',
      label: 'Войти',
    };

    return `
      {{{AuthForm
          id='signup'
          name='signup-form'
          title='Регистрация'
          ref='form'
          className='signup-form'
          inputs='${JSON.stringify(inputs)}'
          submitBtn='Зарегистрироваться'
          onSubmit=handleSubmit
          link='${JSON.stringify(link)}'
      }}}
    `;
  }
}

export default Signup;
