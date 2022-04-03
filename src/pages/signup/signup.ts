import Block from 'utils/Block';
import Form from 'components/form';
import signupTemplate from './signup.tmpl.hbs';
import './signup.style.scss';
import {
  FORM,
  INPUTS,
  SUBMIT_BTN,
  LOGIN_LINK,
} from './const';

class Signup extends Block {
  initChildren() {
    this.children.form = new Form({
      id: FORM.id,
      name: FORM.name,
      title: FORM.title,
      className: 'signup-form',
      inputs: Object.keys(INPUTS).map((key) => ({ name: key, ...INPUTS[key] })),
      submitBtn: SUBMIT_BTN,
      link: LOGIN_LINK,
      onFormSubmit: this.handleFormSubmit,
    });
  }

  handleFormSubmit() {
    window.location.href = '/chats';
  }

  render() {
    return this.compile(signupTemplate, {});
  }
}

export default Signup;
