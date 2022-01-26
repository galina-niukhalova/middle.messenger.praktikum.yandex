import './error.style.scss';
import { addContentToMainSection } from 'utils/dom';
import errorTemplate from './error.tmpl.hbs';

function renderError() {
  const content = errorTemplate();

  addContentToMainSection(content);
}

export default renderError;
