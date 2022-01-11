import linkTemplate from './link.tmpl.hbs';
import Handlebars from 'handlebars/dist/handlebars.runtime';
import './link.style.scss';
import classnames from 'utils/classNames';

Handlebars.registerHelper('link', function (options) {
  const { hash } = options || {};
  if (!hash) return;

  const { url, title, className, danger, size = "medium" } = hash;
  const linkHTML = linkTemplate({
    url: Handlebars.escapeExpression(url),
    title: Handlebars.escapeExpression(title),
    className: Handlebars.escapeExpression(
      classnames('link', `link_${size}`, {
        [className]: !!className,
        'link_danger': !!danger,
      })
    )
  });

  return new Handlebars.SafeString(linkHTML);
});


