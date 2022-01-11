import errorTemplate from './error.tmpl.hbs';
import './error.style.scss';

function renderError() {
  document.body.innerHTML = errorTemplate();
}

export default renderError;