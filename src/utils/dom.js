function getErrorMessageElement(formName, inputName) {
  return document.getElementById(`${formName}_${inputName}-error`);
}

export {
  getErrorMessageElement
};