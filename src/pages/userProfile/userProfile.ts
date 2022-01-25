import userProfileTemplate from './userProfile.tmpl.hbs';
import './userProfile.style.scss';
import avatarPlaceholder from 'static/images/image-outline.svg';
import './changeUserInfoForm';
import {
  SELECTORS,
  userInfoFormData,
  passwordChangeFormData,
} from './const';
import { addContentToMainSection } from 'utils/dom';
import { ProfileForms, Views, IFormData } from './types';

function listenAvatarUpload() {
  document.getElementsByClassName(SELECTORS.AVATAR.FILE_UPLOAD)[0]
    .addEventListener('input', ({ target: input }) => {
      const reader = new FileReader();

      reader.onload = function (e) {
        const avatarImage = document.getElementsByClassName(SELECTORS.AVATAR.IMAGE)[0] as HTMLImageElement;
        avatarImage.src = e.target?.result as string;
        avatarImage.classList.remove(SELECTORS.AVATAR.IMAGE_PLACEHOLDER);
        disableAvatarEdit();
      };

      if (input instanceof HTMLInputElement && input.files?.length) {
        reader.readAsDataURL(input.files[0]);
      }
    });
}

function listenSubmitUserInfo() {
  document.getElementById(SELECTORS.PROFILE_FORM.USER_INFO_FORM.DEFAULT)?.addEventListener('submit', (e) => {
    e.preventDefault();
    switchViewTo(Views.READ_ONLY);
  });
}

function listenSubmitPassword() {
  document.getElementById(SELECTORS.PROFILE_FORM.PASSWORD_CHANGE_FORM.DEFAULT)?.addEventListener('submit', (e) => {
    e.preventDefault();
    switchViewTo(Views.READ_ONLY);
  });
}

function listenChangeUserInfoBtnClick() {
  document.getElementById(SELECTORS.ACTIONS_BUTTONS.CHANGE_USER_INFO)?.addEventListener('click', () => {
    switchViewTo(Views.EDIT_USER_INFO);
  });
}

function listenChangePasswordBtnClick() {
  document.getElementById(SELECTORS.ACTIONS_BUTTONS.CHANGE_PASSWORD)?.addEventListener('click', () => {
    switchViewTo(Views.EDIT_USER_PASSWORD);
  });
}

function disableInputs(form: ProfileForms, disabled = true) {
  if (form) {
    Array.from(document.querySelectorAll(SELECTORS.PROFILE_FORM[form].INPUT))?.forEach(
      (inputElement: HTMLInputElement) => {
        inputElement.readOnly = disabled;
      });
  }
}

function displaySubmitButton(form: ProfileForms, shown = true) {
  const submitBtn = document.querySelector(SELECTORS.PROFILE_FORM[form].SUBMIT_BTN);

  shown
    ? submitBtn?.classList.remove(SELECTORS.PROFILE_FORM.SUBMIT_BTN_HIDDEN)
    : submitBtn?.classList.add(SELECTORS.PROFILE_FORM.SUBMIT_BTN_HIDDEN);
}

function displayActionsButtons(shown = true) {
  const actionsButtons = document.getElementsByClassName(SELECTORS.ACTIONS_BUTTONS.DEFAULT)[0];

  shown
    ? actionsButtons.classList.remove(SELECTORS.ACTIONS_BUTTONS.HIDDEN)
    : actionsButtons.classList.add(SELECTORS.ACTIONS_BUTTONS.HIDDEN);
}

function disableAvatarEdit(disabled = true) {
  const avatarLabel = document.getElementsByClassName(SELECTORS.AVATAR.LABEL)[0];

  disabled
    ? avatarLabel.classList.add(SELECTORS.AVATAR.LABEL_HIDDEN)
    : avatarLabel.classList.remove(SELECTORS.AVATAR.LABEL_HIDDEN);
}

function showFormInputs(form: ProfileForms, shown = true) {
  const formElement = document.getElementById(SELECTORS.PROFILE_FORM[form].DEFAULT);

  shown
    ? formElement?.classList.remove(SELECTORS.PROFILE_FORM.DISABLED)
    : formElement?.classList.add(SELECTORS.PROFILE_FORM.DISABLED);
}

function switchViewTo(viewName: Views) {
  switch (viewName) {
    case Views.READ_ONLY:
      showFormInputs(ProfileForms.PASSWORD_CHANGE_FORM, false);
      showFormInputs(ProfileForms.USER_INFO_FORM);
      disableInputs(ProfileForms.USER_INFO_FORM);
      displayActionsButtons();
      displaySubmitButton(ProfileForms.USER_INFO_FORM, false);
      break;
    case Views.EDIT_USER_INFO:
      disableAvatarEdit(false);
      disableInputs(ProfileForms.USER_INFO_FORM, false);
      displayActionsButtons(false);
      displaySubmitButton(ProfileForms.USER_INFO_FORM);
      break;
    case Views.EDIT_USER_PASSWORD:
      showFormInputs(ProfileForms.PASSWORD_CHANGE_FORM);
      showFormInputs(ProfileForms.USER_INFO_FORM, false);
      displayActionsButtons(false);
      displaySubmitButton(ProfileForms.PASSWORD_CHANGE_FORM);
      break;
  }
}

function getInputsFrom(formDataObject: IFormData, readonly: boolean) {
  return Object.keys(formDataObject)
    .map(key => ({ ...formDataObject[key], name: key, readonly }));
}

function renderUserProfilePage() {
  const content = userProfileTemplate({
    avatar: {
      imageUrl: '',
      placeholder: avatarPlaceholder,
    },
    userInfoForm: {
      id: SELECTORS.PROFILE_FORM.USER_INFO_FORM.DEFAULT,
      inputs: getInputsFrom(userInfoFormData, true),
      submitBtn: {
        title: 'Сохранить',
      }
    },
    passwordChangeForm: {
      id: SELECTORS.PROFILE_FORM.PASSWORD_CHANGE_FORM.DEFAULT,
      inputs: getInputsFrom(passwordChangeFormData, false),
      submitBtn: {
        title: 'Сохранить',
      }
    },
    userName: 'Test user',
  });

  addContentToMainSection(content);

  listenAvatarUpload();
  listenChangeUserInfoBtnClick();
  listenChangePasswordBtnClick();
  listenSubmitUserInfo();
  listenSubmitPassword();
}


export default renderUserProfilePage;
