import chatTemplate from './chat.tmpl.hbs';
import './chat.style.scss';

function renderChat() {
  document.body.innerHTML = chatTemplate();
}

export default renderChat;