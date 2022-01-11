import signupTemplate from './signup.tmpl.hbs';
import './signup.style.scss';
import Form from 'components/form';
import {
  FORM,
  INPUTS,
  SUBMIT_BTN,
  LOGIN_LINK
} from './const';

function handleFormSubmit() {
  window.location.href = '/chats';
}

/** RENDER */
function renderSignupPage() {
  document.body.innerHTML = signupTemplate(
    {
      data: {
        formID: FORM.id,
        title: FORM.title,
        formClassName: 'signup-form',
        inputs:
          Object.keys(INPUTS).map(key =>
            ({ name: key, ...INPUTS[key] })
          ),
        submitBtn: SUBMIT_BTN,
        formLink: LOGIN_LINK,
      }
    }
  );

  const signupForm = new Form(FORM.id, FORM.name, INPUTS);
  signupForm.listenFormSubmission(handleFormSubmit);
  signupForm.listenInputsChange();
}

export default renderSignupPage;