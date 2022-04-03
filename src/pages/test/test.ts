import Block from 'utils/Block';

export class TestPage extends Block {
  render() {
    return `
    <div class="screen screen_theme_full">
      <div class="screen__content">
        {{{Button label="Login"}}}
        <div>
          {{{Link label="Login" to="/login"}}}
          {{{Link label="Sign Up" to="/signup"}}}
        </div>
      </div>
    </div>
    `;
  }
}

export default TestPage;
