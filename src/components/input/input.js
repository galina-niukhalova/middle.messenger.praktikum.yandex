import inputTemplate from './input.hbs';
import Handlebars from "handlebars/dist/handlebars.runtime";
import './input.scss';

Handlebars.registerHelper("input", function (options) {
  const { hash } = options || {};
  if (!hash) return;

  const { className, type, name, label, errorId, isFormInput } = hash;

  const html = inputTemplate({
    className: Handlebars.escapeExpression(className),
    containerClassName: isFormInput && "form__input-container",
    type: Handlebars.escapeExpression(type),
    name: Handlebars.escapeExpression(name),
    label: Handlebars.escapeExpression(label),
    errorId: Handlebars.escapeExpression(errorId),
  });

  return new Handlebars.SafeString(html);
});