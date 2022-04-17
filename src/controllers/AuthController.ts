import AuthAPI from 'api/auth';
import {
  SignupFormData,
  LoginFormData,
} from './types/auth';

const authApi = new AuthAPI();
// const userLoginValidator = validateLoginFields(validateRules);

class AuthController {
  // public async login(data: LoginFormModel) {
  //   try {
  //     // Запускаем крутилку            

  //     const validateData = userLoginValidator(data);

  //     if (!validateData.isCorrect) {
  //       throw new Error(validateData);
  //     }

  //     const userID = loginApi.request(prepareDataToRequest(data));

  //     RouteManagement.go('/chats');

  //     // Останавливаем крутилку
  //   } catch (error) {
  //     // Логика обработки ошибок
  //   }
  // }

  public async signup(data: SignupFormData) {
    try {
      authApi.signup(data).then((response) => {
        console.log('AuthController', response);

        window.router.go(Routes.Chats);
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async signin(data: LoginFormData) {
    try {
      authApi.signin(data).then((response) => {
        console.log('AuthController', response);

        window.router.go(Routes.Chats);
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async logout() {
    window.router.go(Routes.Home);
  }
}

export default AuthController;
