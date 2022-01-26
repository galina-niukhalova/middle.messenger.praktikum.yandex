import { addContentToMainSection } from 'utils/dom';
import notFoundTemplate from './notFound.hbs';
import './notFound.style.scss';

function renderNotFound() {
  const content = notFoundTemplate();

  addContentToMainSection(content);
}

export default renderNotFound;
