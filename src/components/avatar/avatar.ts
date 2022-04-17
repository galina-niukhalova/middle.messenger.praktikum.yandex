import Block from 'utils/Block';
import avatarPlaceholder from 'static/images/image-outline.svg';
import { IAvatarProps } from './types';
import './avatar.style.scss';

class Avatar extends Block {
  constructor(props: IAvatarProps) {
    super({
      ...props,
      emptyPlaceholder: avatarPlaceholder,
    });
  }

  render() {
    return `
      <div class='avatar'>
        <label for='avatar__file-upload' class='avatar__label'></label>
        {{{ Input 
            type="file"
            alt="Выберите аватарку"
            id="avatar__file-upload"
            className="avatar__file-upload"
            accept="image/*"
            name="avatar"
            onChange=onChange
        }}}
        <div class='avatar__image-wrap'>
          {{#if imageUrl}}
            <img class='avatar__image' src={{imageUrl}} />
          {{else}}
            <img class='avatar__image avatar__image-placeholder' src={{emptyPlaceholder}} />
          {{/if}}
        </div>
      </div>
  `;
  }
}

export default Avatar;
