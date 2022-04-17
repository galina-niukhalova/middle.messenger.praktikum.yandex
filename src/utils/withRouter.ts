import { Block, Router } from 'core';

export function withRouter<T extends {}>(Component: typeof Block) {
  return class WithRouter extends Component<T> {
    public static componentName = Component.name;

    constructor(props: T & { router: Router }) {
      super({ ...props, router: window.router });
    }
  };
}
