import chatsListTemplate from './chatsList.tmpl.hbs';
import './chatsList.style.scss';
import { addContentToMainSection } from 'utils/dom';

function renderChatsList() {
  const content = chatsListTemplate();

  addContentToMainSection(content);
}

export default renderChatsList;
