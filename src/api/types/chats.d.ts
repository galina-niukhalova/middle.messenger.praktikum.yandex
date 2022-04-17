export type CreateChatRequest = {
  title: string
}

export type DeleteChatRequest = {
  chatId: number,
}

export type GetChatUsersRequest = {
  id: number,
  offset: number,
  limit: number,
  name: string,
  email: string,
}

export type GetNewMessagesRequest = {
  id: number,
}

export type UploadAvatarRequest = {
  chatId: number,
  avatar: FormData,
}

export type AddUsersToChatRequest = {
  users: number[],
  chatId: number,
}

export type DeleteUsersFromChatRequest = {
  users: number[],
  chatId: number,
}
