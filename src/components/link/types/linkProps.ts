type LinkSize = 'small' | 'medium';

interface ILinkProps {
  url: string,
  label: string,
  className?: string,
  danger?: boolean,
  size?: LinkSize
}

export default ILinkProps;
