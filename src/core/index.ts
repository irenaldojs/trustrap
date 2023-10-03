import { Statefull } from "./statefull";
import { Widget } from "./widgets";

export type RouterType = {
  [key: string]: {
    page: any;
    root: string;
  };
};

class TruStrap {
  routes: RouterType;
  instances: Statefull[] = [];

  constructor(routes: RouterType) {
    this.routes = routes;
    this.navigation();
    window.addEventListener("popstate", () => this.navigation());
  }
  navigation(path?: string) {
    let instantiate = true;
    const oldRoute = this.getRoute();

    if (path && path !== oldRoute) {
      this.changeRoute(path, oldRoute);
    } else if (!path) {
      path = oldRoute;
    }

    this.instances.forEach((instance) => {
      if (instance.router == path) {
        instantiate = false;
        instance.renderDom();
      }
    });
    if (instantiate) {
      const { page, root } = this.routes[path];
      const instance: Statefull = new page(root);
      if (instance && instance instanceof Statefull) {
        instance.app = this;
        instance.router = path;
        this.instances.push(instance);
        instance.renderDom();
      }
    }
  }

  getRoute(): string {
    const params = this.getAllParams();
    const route = params["r"] ?? "/";
    if (route[0] !== "/") {
      return route;
    }
    return route;
  }

  getParams(): any {
    const newParams = this.getAllParams();
    delete newParams["r"];
    return newParams;
  }

  getAllParams(): any {
    const paramsBase = window.location.search.split("?");
    if (paramsBase.length < 2) return {};
    const paramsRoute = paramsBase[1].split("&");
    let params: any = {};
    paramsRoute.forEach((param) => {
      const [name, value] = param.split("=");
      if (typeof name === "string" && value) {
        const Note = { [name]: value };
        params = { ...params, ...Note };
      }
    });
    return params;
  }

  changeRoute(newRoute: string, oldRoute: string) {
    const baseURL = window.location.origin;
    if (newRoute !== "/") {
      const newUrl = baseURL + "?r=" + newRoute;
      window.history.pushState({}, oldRoute, newUrl);
    } else {
      window.history.pushState({}, oldRoute, "/");
    }
  }
}

function createTruStrap(routes: RouterType) {
  return new TruStrap(routes);
}

export { createTruStrap, Statefull, TruStrap, Widget };
