import './link.style.scss';
import classnames from 'helpers/classnames';
import Block from 'utils/Block';
import ILinkProps from './types';
import linkTemplate from './link.tmpl.hbs';

class Link extends Block {
  constructor(props: ILinkProps) {
    const size = props.size ?? 'medium';
    const classNames = [];
    if (props.className) classNames.push(props.className);

    const defaultProps = {
      size,
      danger: false,
      className: classnames(...classNames, 'link', `link_${size}`, {
        link_danger: !!props.danger,
      }),
    };

    super({
      ...defaultProps,
      ...props,
    });
  }

  render() {
    return this.compile(linkTemplate, { ...this.props });
  }
}

export default Link;
