import { isEqual } from 'helpers/mydash';
import renderDOM from 'core/renderDOM';
import Block from 'core/Block';

interface BlockConstructable<Props extends {}> {
  new(props: any): Block<Props>;
}

interface IProps {
  rootQuery: string,
}

export default class Route {
  private _pathname;

  private _blockClass: BlockConstructable<{}>;

  private _block: Nullable<Block<{}>>;

  private _props: IProps;

  constructor(pathname: string, view: BlockConstructable<{}>, props: IProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass({});
      renderDOM(this._block, this._props.rootQuery);
      return;
    }

    this._block.show();
  }
}
