import ChatsAPI from 'api/chats';

const chatsApi = new ChatsAPI();

class ChatsController {
  public async getChats() {
    try {
      chatsApi.get().then((response) => {
        console.log('Get chats', response);
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async createChat(title: string) {
    try {
      chatsApi.createChat({ title }).then((response) => {
        console.log('Create chat', response);
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async deleteChat(chatId: number) {
    try {
      chatsApi.deleteChat({ chatId }).then((response) => {
        console.log('Delete chat', response);
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default ChatsController;
