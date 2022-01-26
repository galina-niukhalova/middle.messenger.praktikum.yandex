import { IHbsRegisterHelperOptions } from 'types';
import Handlebars from 'handlebars/dist/handlebars.runtime';
import classnames from 'utils/classnames';
import changeUserInfoFormTemplate from './changeUserInfoForm.tmpl.hbs';
import './changeUserInfoForm.style.scss';
import { IChangeUserProfileProps } from './types';

Handlebars.registerHelper('profileForm', (options: IHbsRegisterHelperOptions<IChangeUserProfileProps>): string => {
  const { hash } = options || {};
  if (!hash) return '';

  const {
    data: {
      inputs,
      id,
      submitBtn,
    },
    disabled,
    readonly,
  } = hash;

  const html = changeUserInfoFormTemplate({
    inputs,
    submitBtn,
    readonly,
    id: Handlebars.escapeExpression(id),
    className: classnames('profile-form', {
      'profile-form_disabled': disabled,
    }),
  });

  return new Handlebars.SafeString(html);
});
