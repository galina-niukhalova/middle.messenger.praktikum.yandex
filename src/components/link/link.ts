import './link.style.scss';
import classnames from 'helpers/classnames';
import Block from 'core/Block';
import { LinkSize, LinkVariants } from './types';

export interface ILinkProps {
  to: string,
  label: string,
  className?: string,
  danger?: boolean,
  size?: LinkSize,
  variant?: LinkVariants
  onClick: (e: Event) => {},
}

export interface ILinkPropsWithEvents extends Omit<ILinkProps, 'onClick'> {
  events: {
    click: (e: Event) => {},
  }
}

class Link extends Block<ILinkPropsWithEvents> {
  constructor(props: ILinkProps) {
    const { onClick, ...rest } = props;
    const size = props.size ?? 'medium';

    const defaultProps = {
      size,
      danger: false,
    };

    super({
      ...defaultProps,
      ...rest,
      className: classnames('link', `link_${size}`, {
        link_danger: !!props.danger,
        link_nav: props.variant === LinkVariants.NAV,
        [props.className ?? '']: Boolean(props.className),
      }),
      events: {
        click: onClick,
      },
    });
  }

  render() {
    return `
    {{#if to}}
      <a 
        href={{to}} 
        class='{{className}}'
      >
        {{label}}
      </a>
    {{else}}
      <div class='{{className}}'>
        {{label}}
      </div>
    {{/if}}
    `;
  }
}

export default Link;
