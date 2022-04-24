import { BlockConstructable, Store } from 'core';

type WithStateProps = { store: Store<AppState> };

export function withStore<P extends WithStateProps>(WrappedBlock: BlockConstructable<P>) {
  return class extends WrappedBlock {
    constructor(props: P) {
      super({ ...props, store: window.store });
    }

    __onChangeStoreCallback = () => {
      this.setProps({ ...this.props, store: window.store });
    };

    componentDidMount(props: P) {
      super.componentDidMount(props);
      window.store.on('changed', this.__onChangeStoreCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      window.store.off('changed', this.__onChangeStoreCallback);
    }
  };
}
