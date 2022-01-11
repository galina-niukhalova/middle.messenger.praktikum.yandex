function isPasswordValid() {
  const password = document.getElementsByName('password')[0];
  const repeatPassword = document.getElementsByName('repeat-password')[0];

  return password.value === repeatPassword.value;
}

export {
  isPasswordValid
};