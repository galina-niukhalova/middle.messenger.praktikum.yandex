export type ChangeUserProfileFormData = {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string,
}

export type ChangeUserPasswordFormData = {
  oldPassword: string,
  newPassword: string
}

export type UploadAvatarFormData = {
  avatar: FormData,
}
