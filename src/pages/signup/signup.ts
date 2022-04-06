import Block from 'utils/Block';
import './signup.style.scss';

class Signup extends Block {
  protected getStateFromProps() {
    this.state = {
      handleSubmit: (values: {
        email: string,
        login: string,
        firstName: string,
        secondName: string,
        phone: string,
        password: string,
      }) => {
        console.log('submit', values);
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
