import classnames from 'helpers/classnames';
import Block from 'core/Block';
import './chatImage.style.scss';

export enum ChatImageSize {
  Small = 'small',
  Medium = 'medium'
}

export interface IChatImageProps {
  size: ChatImageSize,
  active: boolean,
}

class ChatImage extends Block<IChatImageProps> {
  render() {
    const containerClassName = classnames('chat-image__container', {
      'chat-image__container_small': this.props.size === ChatImageSize.Small,
      'chat-image__container_medium': this.props.size === ChatImageSize.Medium,
      'chat-image__container_active': this.props.active,
    });

    return `
    <div class="${containerClassName}">
    {{#if imgUrl}}
      <img src={{imgUrl}} />
    {{/if}}
    </div>
  `;
  }
}

export default ChatImage;
