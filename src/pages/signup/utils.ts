function isPasswordValid() {
  const password = document.getElementsByName('password')[0] as HTMLInputElement;
  const repeatPassword = document.getElementsByName('repeat-password')[0] as HTMLInputElement;

  return password.value === repeatPassword.value;
}

export default isPasswordValid;
