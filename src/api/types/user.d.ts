export type ChangeUserProfileRequest = {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string,
}

export type ChangeAvatarRequest = {
  avatar: FormData,
}

export type ChangeUserPasswordRequest = {
  oldPassword: string,
  newPassword: string
}

export type GetUserByIdRequest = {
  id: number,
}

export type FindUsersRequest = {
  login: string,
}
