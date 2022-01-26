import './chat.style.scss';
import { addContentToMainSection } from 'utils/dom';
import chatTemplate from './chat.tmpl.hbs';

function renderChat() {
  const content = chatTemplate();

  addContentToMainSection(content);
}

export default renderChat;
