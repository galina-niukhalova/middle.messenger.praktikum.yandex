import notFoundTemplate from './notFound.hbs';
import './notFound.style.scss';
import { addContentToMainSection } from 'utils/dom';

function renderNotFound() {
  const content = notFoundTemplate();

  addContentToMainSection(content);
}

export default renderNotFound;
