import Form from 'components/form';
import { addContentToMainSection } from 'utils/dom';
import loginTemplate from './login.tmpl.hbs';
import './login.style.scss';
import {
  FORM,
  INPUTS,
  NO_ACCOUNT_LINK,
  SUBMIT_BTN,
} from './const';

function handleFormSubmit() {
  window.location.href = '/chats';
}

function renderLoginPage() {
  const content = loginTemplate(
    {
      data: {
        formID: FORM.id,
        title: FORM.title,
        formClassName: 'login-form',
        inputs:
          Object.keys(INPUTS).map((key) => ({ name: key, ...INPUTS[key] })),
        submitBtn: SUBMIT_BTN,
        formLink: NO_ACCOUNT_LINK,
      },
    },
  );

  addContentToMainSection(content);

  const loginForm = new Form(
    FORM.id,
    FORM.name,
    INPUTS,
  );
  loginForm.listenFormSubmission(handleFormSubmit);
  loginForm.listenInputsChange();
}

export default renderLoginPage;
