type LinkSize = 'small' | 'medium';

export enum LinkVariants {
  CLASSIC,
  NAV
}
export interface ILinkProps {
  to: string,
  label: string,
  className?: string,
  danger?: boolean,
  size?: LinkSize,
  variant?: LinkVariants
}

export default ILinkProps;
