import errorTemplate from './error.tmpl.hbs';
import './error.style.scss';
import { addContentToMainSection } from 'utils/dom';

function renderError() {
  const content = errorTemplate();

  addContentToMainSection(content);
}

export default renderError;
