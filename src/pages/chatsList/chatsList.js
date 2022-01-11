import chatsListTemplate from './chatsList.tmpl.hbs';
import './chatsList.style.scss';

function renderChatsList() {
  document.body.innerHTML = chatsListTemplate();
}

export default renderChatsList;