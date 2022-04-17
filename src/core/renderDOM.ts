import Block from './Block';

export default function renderPage(block: Block<{}>, selector = '#app') {
  const root = document.querySelector(selector);

  root!.innerHTML = '';

  root!.appendChild(block.getContent());
}
