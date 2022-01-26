import Handlebars from 'handlebars/dist/handlebars.runtime';
import './button.scss';
import classnames from 'utils/classnames';
import { IHbsRegisterHelperOptions } from 'types';
import { IButtonProps } from './types';
import buttonTemplate from './button.hbs';

const BUTTON_VARIANTS = {
  CLASSIC: 'classic',
  LINK: 'link',
};

Handlebars.registerHelper('button', (
  options: IHbsRegisterHelperOptions<IButtonProps>,
): string => {
  const { hash } = options || {};
  if (!hash) return '';

  const {
    type,
    className,
    title,
    id,
    variant = BUTTON_VARIANTS.CLASSIC,
  } = hash;

  const html = buttonTemplate({
    type: Handlebars.escapeExpression(type || 'button'),
    title: Handlebars.escapeExpression(title),
    className: classnames({
      [className]: !!className,
      button_link: variant === BUTTON_VARIANTS.LINK,
      button: variant === BUTTON_VARIANTS.CLASSIC,
    }),
    id: Handlebars.escapeExpression(id),
  });

  return new Handlebars.SafeString(html);
});
