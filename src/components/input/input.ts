import Handlebars from 'handlebars/dist/handlebars.runtime';
import './input.scss';
import { IHbsRegisterHelperOptions } from 'types';
import { IInputProps } from './types';
import inputTemplate from './input.hbs';

Handlebars.registerHelper('input', (options: IHbsRegisterHelperOptions<IInputProps>): string => {
  const { hash } = options || {};
  if (!hash) return '';

  const {
    className, type, name, label, errorId, isFormInput,
  } = hash;

  const html = inputTemplate({
    className: Handlebars.escapeExpression(className),
    containerClassName: isFormInput && 'form__input-container',
    type: Handlebars.escapeExpression(type),
    name: Handlebars.escapeExpression(name),
    label: Handlebars.escapeExpression(label),
    errorId: Handlebars.escapeExpression(errorId),
  });

  return new Handlebars.SafeString(html);
});
