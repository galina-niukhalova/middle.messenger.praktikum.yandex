function getErrorMessageElement(formName: string, inputName: string) {
  return document.getElementById(`${formName}_${inputName}-error`);
}

function addContentToMainSection(content: string) {
  const el = document.createElement('div');
  el.innerHTML = content;
  document.getElementsByTagName('main')[0].appendChild(el);
}

export {
  getErrorMessageElement,
  addContentToMainSection,
};
