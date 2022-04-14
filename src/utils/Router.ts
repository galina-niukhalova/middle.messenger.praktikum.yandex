import Block from 'utils/Block';
import Route from './Route';

interface BlockConstructable<Props extends {}> {
  new(props: any): Block<Props>;
}

export class Router {
  private static __instance: Router;

  private _rootQuery: string;

  private _currentRoute: Nullable<Route>;

  routes: Route[];

  history: History;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      // eslint-disable-next-line no-constructor-return
      return Router.__instance;
    }

    Router.__instance = this;

    this.routes = [];

    this.history = window.history;

    this._currentRoute = null;

    this._rootQuery = rootQuery;
  }

  use(pathname: string, block: BlockConstructable<{}>) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });

    this.routes.push(route);

    return this;
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  start() {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Nullable<Window>;

      if (target) {
        this._onRoute(target.location.pathname);
      }
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}
