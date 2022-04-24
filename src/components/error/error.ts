import { Block } from 'core';

import './error.scss';

interface IErrorProps {
  value?: string;
}

class Error extends Block<IErrorProps> {
  protected render(): string {
    return `
      <div 
        class="error">
          {{#if value}}{{value}}{{/if}}
      </div>
    `;
  }
}

export default Error;
