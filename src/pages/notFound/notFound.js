import notFoundTemplate from './notFound.hbs';
import './notFound.style.scss';

function renderNotFound() {
  document.body.innerHTML = notFoundTemplate();
}

export default renderNotFound;