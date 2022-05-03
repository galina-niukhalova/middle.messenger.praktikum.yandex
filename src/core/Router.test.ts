import Router from './Router';
import Block from './Block';

describe('Router', () => {
  let router: Router;

  beforeAll(() => {
    const rootElement = document.createElement('div');
    rootElement.id = 'app';
    document.body.appendChild(rootElement);

    router = new Router('#app');

    class ProfilePage extends Block<{}> {
      render() {
        return '<div>Profile page</div>';
      }
    }
    class LoginPage extends Block<{}> {
      render() {
        return '<div>Login page</div>';
      }
    }
    class SignupPage extends Block<{}> {
      render() {
        return '<div>Signup page</div>';
      }
    }

    router
      .use('/profile', ProfilePage)
      .use('/login', LoginPage)
      .use('/signup', SignupPage)
      .start();
  });

  test('should change route', () => {
    router.go('/');
    router.go('/profile');
    expect(router.history.length).toEqual(3);
  });

  test('should go back and forward', () => {
    window.history.back = jest.fn();
    window.history.forward = jest.fn();

    router.go('/');
    router.go('/profile');
    router.back();

    expect(window.history.back).toHaveBeenCalledTimes(1);

    router.forward();

    expect(window.history.forward).toHaveBeenCalledTimes(1);
  });
});
