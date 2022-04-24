import { Block } from 'core';
import classnames from 'helpers/classnames';
import './spinner.scss';

export enum SpinnerSize {
  sm = 'small',
  md = 'medium',
  lg = 'large'
}

interface ISpinnerProps {
  size: SpinnerSize,
  className: string,
}

class Spinner extends Block<ISpinnerProps> {
  constructor(props: ISpinnerProps) {
    const { size, className } = props;
    const spinnerSize = size || SpinnerSize.sm;

    super({
      ...props,
      className: classnames(
        'spinner',
        `spinner__${spinnerSize}`,
        { [className]: Boolean(className) },
      ),
      size: spinnerSize,
    });
  }

  render() {
    return `
      <div class="{{className}}" />
    `;
  }
}

export default Spinner;
