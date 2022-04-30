import { UserDTO } from 'api/types/user';
import { ChatDTO } from 'api/types/chats';

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

export const transformChats = (data: ChatDTO[]): Chat[] => data.map((chat) => ({
  id: chat.id,
  title: chat.title,
  avatar: chat.avatar ? `${AVATAR_BASE_URL}${chat.avatar}` : '',
  unreadCount: chat.unread_count,
}));
