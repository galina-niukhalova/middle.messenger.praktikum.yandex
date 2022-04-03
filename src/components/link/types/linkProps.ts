type LinkSize = 'small' | 'medium';

interface ILinkProps {
  to: string,
  label: string,
  className?: string,
  danger?: boolean,
  size?: LinkSize
}

export default ILinkProps;
