type LinkSize = 'small' | 'medium';

interface ILinkProps {
  url: string,
  title: string,
  className: string,
  danger: boolean,
  size: LinkSize
}

export default ILinkProps;
