interface IChatsListItemProps {
  id: string,
  userName: string,
  userLogo: string,
  lastMessage: string,
  lastMessageDate: string,
  lastMessageSender: string,
  unread: number,
  onChatClick: (id: string) => {},
}

export default IChatsListItemProps;
