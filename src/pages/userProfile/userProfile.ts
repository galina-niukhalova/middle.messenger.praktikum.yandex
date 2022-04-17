import './userProfile.style.scss';
import Block from 'utils/Block';
import { ButtonVariants } from 'components/button/types';
import { Views, IFormData, IUserProfileProps } from './types';
import {
  userInfoFormData,
  passwordChangeFormData,
} from './const';

class UserProfile extends Block {
  constructor(props: IUserProfileProps) {
    super({
      ...props,
      view: Views.READ_ONLY,
    });
  }

  protected getStateFromProps() {
    const values: { [key: string]: string } = {};
    const errors: { [key: string]: boolean } = {};
    (userInfoFormData as IFormData[]).forEach((input: IFormData) => {
      values[input.name] = '';
      errors[input.name] = false;
    });
    (passwordChangeFormData as IFormData[]).forEach((input: IFormData) => {
      values[input.name] = '';
      errors[input.name] = false;
    });

    this.state = {
      values,
      errors,
    };

    this.state = {
      values,
      errors,
      avatarImg: '',
      view: Views.READ_ONLY,
      updateErrors: this.updateErrors.bind(this),
      onChangeUserInfoClick: this.handleChangeUserInfoBtnClick.bind(this),
      onSubmitUserInfo: this.handleUserInfoSubmit.bind(this),
      onChangePasswordClick: this.handleChangePasswordBtnClick.bind(this),
      onSubmitPassword: this.handlePasswordSubmit.bind(this),
      onAvatarChange: this.handleAvatarChange.bind(this),
    };
  }

  switchView(view: Views) {
    const nextState = {
      view,
    };

    this.setState(nextState);
  }

  updateErrors(field: string, newValue: string, isValid = false) {
    const nextState = {
      values: {
        ...this.state.values,
        [field]: newValue,
      },
      errors: {
        ...this.state.errors,
        [field]: !isValid,
      },
    };

    this.setState(nextState);
  }

  handleChangePasswordBtnClick() {
    this.switchView(Views.EDIT_USER_PASSWORD);
  }

  handleChangeUserInfoBtnClick() {
    this.switchView(Views.EDIT_USER_INFO);
  }

  handleUserInfoSubmit(values: { [key: string]: string }) {
    const mapFieldToApi: { [key: string]: string } = {
      email: 'email',
      login: 'login',
      firstName: 'first-name',
      secondName: 'second-name',
      displayName: 'display-name',
      phone: 'phone',
    };

    const newValues: { [key: string]: string } = {};
    Object.keys(mapFieldToApi).forEach((key: string) => {
      newValues[mapFieldToApi[key]] = values[key];
    });

    this.setState({
      view: Views.READ_ONLY,
      values: newValues,
    });

    console.log('Form has been submitted with', newValues);
  }

  handlePasswordSubmit(values: { [key: string]: string }) {
    this.setState({
      view: Views.READ_ONLY,
      values: {
        ...this.state.values,
        values,
      },
    });

    console.log('Form has been successfully submitted', values);
  }

  handleAvatarChange(e: Event) {
    const input = e.target;
    if (input) {
      const self = this;
      const reader = new FileReader();

      reader.onload = (event) => {
        const avatar = event.target?.result;
        self.setState({
          ...self.state,
          avatarImg: avatar,
        });

        console.log({ avatar });
      };

      if (input instanceof HTMLInputElement && input.files?.length) {
        reader.readAsDataURL(input.files[0]);
      }
    }
  }

  render() {
    const {
      view,
      values,
      errors,
      avatarImg,
    } = this.state;

    const userInfoInputs = userInfoFormData.map((input) => ({
      ...input,
      value: values[input.name],
      invalid: errors[input.name],
    }));

    const passwordChangeInputs = passwordChangeFormData.map((input) => ({
      ...input,
      value: values[input.name],
      invalid: errors[input.name],
    }));

    return `
      <div class='page-wrap profile'>
        {{{ Avatar 
          imageUrl="${avatarImg}"
          onChange=onAvatarChange 
        }}}
        {{#ifEquals ${view} ${Views.EDIT_USER_INFO}}}
          {{{ ProfileForm 
            inputs='${JSON.stringify(userInfoInputs)}'
            onSubmit=onSubmitUserInfo
            updateErrors=updateErrors
          }}}
        {{/ifEquals}}

        {{#ifEquals ${view} ${Views.EDIT_USER_PASSWORD}}}
        {{{ ProfileForm 
          inputs='${JSON.stringify(passwordChangeInputs)}'
          onSubmit=onSubmitPassword
          updateErrors=updateErrors
        }}}
        {{/ifEquals}}

        {{#ifEquals ${view} ${Views.READ_ONLY}}}
          {{{ ProfileForm 
            inputs='${JSON.stringify(userInfoInputs)}'
            readonly=true
          }}}
          <ul class='profile__actions-buttons'>
            <li class='profile__actions-button-row'>
              {{{ Button 
                  id="change-user-info-button"
                  variant=${ButtonVariants.LINK}
                  label="Изменить данные"
                  onClick=onChangeUserInfoClick
              }}}
            </li>
            <li class='profile__actions-button-row'>
              {{{ Button 
                    id="change-password-button"
                    variant=${ButtonVariants.LINK}
                    label="Изменить пароль"
                    onClick=onChangePasswordClick
              }}}
            </li>
            <li class='profile__actions-button-row'>
              {{{ Link label="Выйти" to="/login" danger=true size="medium" }}}
            </li>
          </ul>
        {{/ifEquals}}
      </div>
    `;
  }
}

export default UserProfile;
