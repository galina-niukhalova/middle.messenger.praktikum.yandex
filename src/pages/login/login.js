import loginTemplate from './login.tmpl.hbs';
import './login.style.scss';
import Form from 'components/form';
import {
  FORM,
  INPUTS,
  NO_ACCOUNT_LINK,
  SUBMIT_BTN
} from './const';

function handleFormSubmit() {
  window.location.href = '/chats';
}

function renderLoginPage() {
  document.body.innerHTML = loginTemplate(
    {
      data: {
        formID: FORM.id,
        title: FORM.title,
        formClassName: 'login-form',
        inputs:
          Object.keys(INPUTS).map(key =>
            ({ name: key, ...INPUTS[key] })
          ),
        submitBtn: SUBMIT_BTN,
        formLink: NO_ACCOUNT_LINK,
      }
    });

  const loginForm = new Form(
    FORM.id,
    FORM.name,
    INPUTS,
  );
  loginForm.listenFormSubmission(handleFormSubmit);
  loginForm.listenInputsChange();
}


export default renderLoginPage;