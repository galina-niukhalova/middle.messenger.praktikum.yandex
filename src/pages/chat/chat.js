import chatTemplate from './chat.tmpl.hbs';
import './chat.style.scss';
import { addContentToMainSection } from 'utils/dom';

function renderChat() {
  const content = chatTemplate();

  addContentToMainSection(content);
}

export default renderChat;
