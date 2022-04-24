import { UserDTO } from 'api/types/user';

export const transformUser = (data: UserDTO): User => ({
  id: data.id,
  login: data.login,
  firstName: data.first_name,
  secondName: data.second_name,
  displayName: data.display_name,
  avatar: data.avatar ? `https://ya-praktikum.tech/api/v2/resources${data.avatar}` : '',
  phone: data.phone,
  email: data.email,
});
