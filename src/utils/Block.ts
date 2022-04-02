import { nanoid } from 'nanoid';
import EventBus from './EventBus';

class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  public id = nanoid(6);

  private _element: HTMLElement | null = null;

  private _meta: { props: any };

  protected props: any;

  protected children: Record<string, Block> = [];

  private eventBus: () => EventBus;

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  public constructor(propsAndChildren: any = {}) {
    const eventBus = new EventBus();

    const { props, children } = this.getChildren(propsAndChildren);

    this._meta = {
      props,
    };

    this.children = children;

    this.props = this._makePropsProxy(props);

    this.initChildren();

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT, this.props);
  }

  // eslint-disable-next-line class-methods-use-this
  getChildren(propsAndChildren: any) {
    const children: any = {};
    const props: any = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value) && value.every(v => v instanceof Block)) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props, children };
  }

  // eslint-disable-next-line class-methods-use-this
  protected initChildren() {

  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props);
  }

  _componentDidMount(props: any) {
    this.componentDidMount(props);
  }

  componentDidMount(props: any) {
  }

  _componentDidUpdate(oldProps: any, newProps: any) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) return;

    this._render();
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    console.log(oldProps, newProps);
    return true;
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const fragment = this.render();

    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this._removeEvents();
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._addEvents();

    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent(): HTMLElement {
    return this.element!;
  }

  _makePropsProxy(props: any) {
    const self = this;

    return new Proxy(props as unknown as object, {
      get(target: Record<string, unknown>, prop: string) {
        const value = target[prop];

        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: Record<string, unknown>, prop: string, value: unknown) {
        const oldProps = { ...target };

        target[prop] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);

        return true;
      },
      deleteProperty() {
        throw new Error('Отказано в доступе');
      },
    }) as unknown;
  }

  // eslint-disable-next-line class-methods-use-this
  _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  _removeEvents() {
    const { events } = this.props as any;

    if (!events || !this._element) {
      return;
    }

    Object.entries(events as Record<string, () => void>).forEach(([event, listener]) => {
      this._element!.addEventListener(event, listener);
    });
  }

  _addEvents() {
    const { events } = this.props as any;

    if (!events || !this._element) {
      return;
    }

    Object.entries(events as Record<string, () => void>).forEach(([event, listener]) => {
      this._element!.addEventListener(event, listener);
    });
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }

  compile(template: (context: any) => string, context: any) {
    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        context[key] = child.map((ch) => `<div data-id="id-${ch.id}"></div>`);
      } else {
        context[key] = `<div data-id="id-${child.id}"></div>`;
      }
    });

    const htmlString = template(context);

    fragment.innerHTML = htmlString;

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        child.forEach((ch) => {
          const stub = fragment.content.querySelector(`[data-id="id-${ch.id}"]`);
          if (stub) {
            stub.replaceWith(ch.getContent());
          }
        });
      } else {
        const stub = fragment.content.querySelector(`[data-id="id-${child.id}"]`);

        if (!stub) return;

        stub.replaceWith(child.getContent());
      }
    });

    return fragment.content;
  }
}

export default Block;
