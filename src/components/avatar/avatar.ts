import Block from 'core/Block';
import avatarPlaceholder from 'static/images/image-outline.svg';
import './avatar.style.scss';

interface IAvatarProps {
  imageUrl: string,
  placeholder: string,
}

class Avatar extends Block<IAvatarProps> {
  constructor(props: IAvatarProps) {
    super({
      ...props,
    });
  }

  render() {
    return `
      <form class='avatar'>
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
            <img class='avatar__image avatar__image-placeholder' src=${avatarPlaceholder} />
          {{/if}}
        </div>
      </form>
  `;
  }
}

export default Avatar;
