function getErrorMessageElement(formName: string, inputName: string) {
  return document.getElementById(`${formName}_${inputName}-error`);
}

function addContentToMainSection(content: string) {
  document.getElementsByTagName('main')[0].innerHTML = content;
}

export {
  getErrorMessageElement,
  addContentToMainSection,
};
