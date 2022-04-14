import './link.style.scss';
import classnames from 'helpers/classnames';
import Block from 'utils/Block';
import { LinkSize, LinkVariants } from './types';

export interface ILinkProps {
  to: string,
  label: string,
  className?: string,
  danger?: boolean,
  size?: LinkSize,
  variant?: LinkVariants
}

class Link extends Block<ILinkProps> {
  constructor(props: ILinkProps) {
    const size = props.size ?? 'medium';
    const classNames = [];
    if (props.className) classNames.push(props.className);

    const defaultProps = {
      size,
      danger: false,
      className: classnames(...classNames, 'link', `link_${size}`, {
        link_danger: !!props.danger,
        link_nav: props.variant === LinkVariants.NAV,
      }),
    };

    super({
      ...defaultProps,
      ...props,
    });
  }

  render() {
    return `
      <a 
        href={{to}} 
        class='{{className}}'
      >
        {{label}}
      </a>
    `;
  }
}

export default Link;
