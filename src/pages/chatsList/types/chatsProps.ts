export interface IChatMessage {
  read: boolean,
  senderId: string,
  message: string,
  date: string,
}

export interface IChat {
  id: string,
  user: {
    id: string,
    name: string,
    logo: string,
  },
  history: IChatMessage[],
}

interface IChatsProps {
  activeChat: {
    userName: string,
  },
  chats: IChat[],
}

export default IChatsProps;