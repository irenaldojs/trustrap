export type WidgetType = {
  id?: string;
  name?: string;
  classWidget?: string;
  src?: string;
  tag?: string;
  observers?: string[];
  promise?: boolean;
  onClick?: Function;
  role?: "button" | "status" | undefined;
};
export type ChildrenType = (Widget | string | number)[];

export class Widget {
  id: string;
  name?: string;
  classWidget?: string;
  tag?: string;
  src?: string;
  children?: (Widget | string | number)[];
  parent?: Element;
  element?: HTMLElement;
  observers: string[] = [];
  onClick?: Function;
  promise?: boolean;
  role?: "button" | "status" | undefined;
  constructor(
    {
      id,
      name,
      classWidget,
      tag,
      onClick,
      observers,
      src,
      promise,
      role,
    }: WidgetType,
    children?: ChildrenType
  ) {
    observers ? (this.observers = observers) : false;
    this.id = id ?? generateId();
    name ? (this.name = name) : false;
    classWidget ? (this.classWidget = classWidget) : false;
    this.tag = tag;
    this.children = children;
    this.onClick = onClick;
    this.src = src;
    this.promise = promise;
    this.role = role;
  }
  /**
   * Creates an element and appends it to the parent widget.
   *
   * @param {Element} parentElement - The parent element to append the element to.
   * @throws {Error} If the element is null.
   */
  renderElement(parent: Element, oldElement?: Element): Element {
    this.element = document.createElement(this.tag ?? "div");

    if (this.element) {
      this.configElement();

      if (oldElement) {
        parent?.replaceChild(this.element, oldElement);
      } else if (parent) {
        parent.append(this.element);
        this.parent = parent;
      }

      if (this.children && this.element) {
        this.children.forEach((child) => {
          if (child instanceof Widget) {
            child.renderElement(this.element!);
          } else {
            this.element?.append(child.toString());
          }
        });
      }
    } else {
      throw new Error("Element is null");
    }
    return this.element;
  }
  /**
   * Updates the element of the widget with the provided widget.
   *
   * @param {Widget} widget - The widget used to update the element.
   * @return {void} This function does not return a value.
   */
  configElement() {
    if (!this.element) return;

    this.element.id = this.id;
    if (this.classWidget != undefined)
      this.element.className = this.classWidget;
    this.name ? this.element.setAttribute("name", this.name) : false;
    this.src ? this.element.setAttribute("src", this.src) : false;
    this.role ? this.element.setAttribute("role", this.role) : false;
    this.element.onclick = () => {
      if (this.onClick) this.onClick();
    };
  }
}
type StateType = {
  [key: string]: any;
};

export abstract class Statefull {
  app?: TruStrap;
  root: string;
  rootElement?: Element | null;
  virtualDom?: Widget;
  state: StateType = {};
  router?: string;

  constructor(root: string) {
    this.root = root;
    this.rootElement = document.getElementById(this.root);
    if (!this.rootElement) throw new Error("Root element not found");

    this.mountState();
    this.virtualDom = this.render();
    this.renderDom();
    this.mountFutureBuild();
  }

  abstract render(): Widget;
  mountState(): void {}
  mountFutureBuild(): void {}

  /**
   * Renders the DOM.
   *
   * This function creates the virtual DOM element using the `createElement` method of the `virtualDom`
   * object, if it exists. If the virtual DOM element is successfully created, the function then calls
   * the `renterTree` method to render the tree.
   *
   * @returns {void} This function does not return a value.
   */
  renderDom(): void {
    const parent = document.getElementById(this.root);

    if (parent) {
      parent.innerHTML = "";
      this.virtualDom?.renderElement(parent);
    }
  }
  /**
   * Recursively renders the tree of widgets starting from the given widget.
   *
   * @param {Widget} widget - The root widget from which to start rendering.
   * @return {void} This function does not return a value.
   */
  renterTree(widget: Widget): void {
    widget.children?.forEach((child) => {
      if (child instanceof Widget) {
        if (widget.element) {
          child.renderElement(widget.element);
        }
        this.renterTree(child);
      } else {
        widget.element?.append(child.toString());
      }
    });
  }

  /**
   * Creates a new state with the given name and value.
   *
   * @param {string} nameState - The name of the state to create.
   * @param {any} value - The value to assign to the state.
   * @return {void} This function does not return anything.
   */
  createState(nameState: string, value: any): void {
    this.state = {
      ...this.state,
      [nameState]: value,
    };
  }
  /**
   * Retrieves the value of a specific state property.
   *
   * @param {string} name - The name of the state property to retrieve.
   * @return {any} The value of the specified state property.
   */
  getState(name: string): any {
    return this.state[name];
  }

  /**
   * Updates the state with a new value.
   *
   * @param {string} stateName - The name of the state to update.
   * @param {any} value - The new value to assign to the state.
   * @throws {Error} If the value is invalid.
   */
  setState(stateName: string, value: any): void {
    this.state = {
      ...this.state,
      [stateName]: value,
    };
    this.updateVirtualDom(stateName);
  }
  /**
   * Updates the virtual DOM by performing a full re-render of the component.
   *
   * @param {string} nameState - The name of the state to update.
   */
  updateVirtualDom(nameState: string) {
    var newVirtualDom = this.render();

    let list: Widget[] = [];
    const pushList = (newWidget: Widget) => {
      list.push(newWidget);
    };

    this.updateTreeState(newVirtualDom, nameState, pushList);

    list.forEach((widget) => {
      const oldElement = document.getElementById(widget.id);
      const parentElement = oldElement?.parentElement;
      if (oldElement && parentElement) {
        widget.renderElement(parentElement, oldElement);
      }
    });

    this.virtualDom = newVirtualDom;
  }
  /**
   * Updates the state of the tree.
   *
   * @param {Widget} widget - The widget to update the state for.
   * @param {string} nameState - The name of the state to update.
   * @param {Function} pushList - The function to push the child widget to the list.
   */
  updateTreeState(widget: Widget, nameState: string, pushList: Function) {
    widget.children?.forEach((child) => {
      if (child instanceof Widget) {
        child.observers.forEach((observer) => {
          if (observer == nameState) {
            pushList(child);
          }
        });
        this.updateTreeState(child, nameState, pushList);
      }
    });
  }

  navigation(path: string) {
    this.app?.navigation(path);
  }

  getParams(): any {
    return this.app?.getParams();
  }
  getParam(name: string): string | null {
    const params = this.app?.getParams();
    if (params && params[name]) {
      return params[name];
    }
    return null;
  }
}

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
  }
  navigation(path?: string) {
    let instantiate = true;

    if (path && path !== this.getRoute()) {
      this.changeRoute(path);
    } else if (!path) {
      path = this.getRoute();
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
    const route = params["route"] ?? "/";
    if (route[0] !== "/") {
      return "/" + route;
    }
    return route;
  }

  getParams(): any {
    const newParams = this.getAllParams();
    delete newParams["route"];
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

  changeRoute(path: string) {
    const baseURL = window.location.origin;
    if (path !== "/") {
      const newUrl = baseURL + "?route=" + path;
      window.history.pushState({}, "", newUrl);
    } else {
      window.history.pushState({}, "", "/");
    }
  }
}
export function createTruStrap(routes: RouterType) {
  return new TruStrap(routes);
}

/**
 * Generates a unique ID.
 *
 * @return {string} A randomly generated unique ID.
 */
export function generateId(): string {
  return "_+" + Math.random().toString(36).substring(2, 15);
}
