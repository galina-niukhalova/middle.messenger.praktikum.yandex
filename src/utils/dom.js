function getErrorMessageElement(formName, inputName) {
  return document.getElementById(`${formName}_${inputName}-error`);
}

function addContentToMainSection(content) {
  document.getElementsByTagName('main')[0].innerHTML = content;
}

export {
  getErrorMessageElement,
  addContentToMainSection
};