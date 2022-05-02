import { UserDTO } from 'api/types/user';
import { ChatDTO } from 'api/types/chats';
import { MessageDTO } from 'api/types/message';

const AVATAR_BASE_URL = 'https://ya-praktikum.tech/api/v2/resources';

export const transformUser = (data: UserDTO): User => ({
  id: data.id,
  login: data.login,
  firstName: data.first_name,
  secondName: data.second_name,
  displayName: data.display_name,
  avatar: data.avatar ? `${AVATAR_BASE_URL}${data.avatar}` : '',
  phone: data.phone,
  email: data.email,
});

export const transformChats = (data: ChatDTO[] = []): Chat[] => data.map((chat) => ({
  id: chat.id,
  title: chat.title,
  avatar: chat.avatar ? `${AVATAR_BASE_URL}${chat.avatar}` : '',
  unreadCount: chat.unread_count,
}));

export const transformMessage = (message: MessageDTO): Message => ({
  id: message.id,
  userId: message.user_id,
  chatId: message.chat_id,
  type: message.type,
  time: message.time,
  content: message.content,
  isRead: message.is_read,
  file: message.file,
});

export const transformMessages = (data: MessageDTO[] = []): Message[] => (
  data
    .map(transformMessage)
    .sort((messageA, messageB) => (messageA.time > messageB.time ? 1 : -1)));
