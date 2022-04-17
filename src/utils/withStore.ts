import { Block, store, StoreEvents } from 'core';

export interface BlockConstructable<Props extends {}> {
  new(props: any): Block<Props>;
}

function withStore<Props extends {}>(
  Component: BlockConstructable<Props>,
  mapStateToProps: (state: GlobalState) => Partial<Props>,
) {
  return class extends Component {
    public static componentName = Component.name;

    constructor(props: Props) {
      let state = mapStateToProps(store.getState());

      super({
        ...props,
        ...state,
      });

      store.on(StoreEvents.Updated, () => {
        const newState = mapStateToProps(store.getState());

        if (!isEqual(state, newState)) {
          this.setProps({ ...props, ...newState });
        }

        state = newState;
      });
    }
  };
}

export default withStore;
