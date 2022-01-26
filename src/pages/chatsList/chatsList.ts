import './chatsList.style.scss';
import { addContentToMainSection } from 'utils/dom';
import chatsListTemplate from './chatsList.tmpl.hbs';

function renderChatsList() {
  const content = chatsListTemplate();

  addContentToMainSection(content);
}

export default renderChatsList;
