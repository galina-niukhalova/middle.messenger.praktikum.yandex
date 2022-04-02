import './login.style.scss';
import Form from 'components/form';
import Block from 'utils/Block';
import tmpl from './login.tmpl.hbs';
import {
  FORM,
  INPUTS,
  NO_ACCOUNT_LINK,
  SUBMIT_BTN,
} from './const';
class Login extends Block {
  initChildren() {
    this.children.form = new Form({
      id: FORM.id,
      name: FORM.name,
      title: FORM.title,
      className: 'login-form',
      inputs: Object.keys(INPUTS).map((key) => ({ name: key, ...INPUTS[key] })),
      submitBtn: SUBMIT_BTN,
      link: NO_ACCOUNT_LINK,
      onFormSubmit: () => { console.log('submit'); },
    });
  }

  render() {
    return this.compile(tmpl, {});
  }
}

export default Login;
