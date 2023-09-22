export type WidgetType = {
  id?: string;
  name?: string;
  classWidget?: string;
  tag?: string;
  observers?: string[];
  onClick?: Function;
};
export type ChildrenType = (Widget | string | number)[];

export class Widget {
  id: string;
  name?: string;
  classWidget?: string;
  tag?: string;
  children?: (Widget | string | number)[];
  parent?: Element;
  element?: HTMLElement;
  observers: string[] = [];
  onClick?: Function;
  constructor(
    { id, name, classWidget, tag, onClick, observers }: WidgetType,
    children?: ChildrenType
  ) {
    observers ? (this.observers = observers) : false;
    this.id = id ?? generateId();
    name ? (this.name = name) : false;
    classWidget ? (this.classWidget = classWidget) : false;
    this.tag = tag;
    this.children = children;
    this.onClick = onClick;
  }
  /**
   * Creates an element and appends it to the parent widget.
   *
   * @param {Element} parentElement - The parent element to append the element to.
   * @throws {Error} If the element is null.
   */
  createElement(parentElement: Element): void {
    this.element = document.createElement(this.tag ?? "div");
    if (this.element) {
      this.configElement();
      parentElement.append(this.element);
      this.parent = parentElement;
    } else {
      throw new Error("Element is null");
    }
  }
  /**
   * Updates the element of the widget with the provided widget.
   *
   * @param {Widget} widget - The widget used to update the element.
   * @return {void} This function does not return a value.
   */
  updateElement(widget: Widget): void {
    var oldElement = document.getElementById(this.id);
    this.element = document.createElement(this.tag ?? "div");
    this.children = widget.children;
    if (this.element) {
      this.configElement();
    }
    oldElement?.parentNode?.replaceChild(this.element, oldElement);
    this.children?.forEach((child) => {
      if (child instanceof Widget) {
        child.updateElement(child);
      } else {
        this.element?.append(child.toString());
      }
    });
  }
  configElement() {
    if (!this.element) return;

    this.element.id = this.id;
    if (this.classWidget != undefined)
      this.element.className = this.classWidget;
    this.name ? this.element.setAttribute("name", this.name) : false;
    this.element.onclick = () => {
      if (this.onClick) this.onClick();
    };
  }
}
type StateType = {
  [key: string]: any;
};
export abstract class Statefull {
  root: string;
  rootElement?: Element | null;
  virtualDom?: Widget;
  state: StateType = {};

  constructor(root: string) {
    this.root = root;
    this.rootElement = document.getElementById(this.root);

    this.mountState();
    if (this.rootElement) {
      this.virtualDom = this.mountTree();
      this.renderDom();
    } else {
      throw new Error("Root element not found");
    }
  }
  abstract mountState(): void;
  abstract mountTree(): Widget;

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
    }
    this.virtualDom?.createElement(this.rootElement!);
    if (this.virtualDom?.element) {
      this.renterTree(this.virtualDom);
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
          child.createElement(widget.element);
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
    var newVirtualDom = this.mountTree();
    let list: Widget[] = [];
    const pushList = (newWidget: Widget) => {
      list.push(newWidget);
    };

    this.updateTreeState(newVirtualDom, nameState, pushList);
    list.forEach((widget) => {
      widget.updateElement(widget);
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
}

type RouterType = {
  [key: string]: Statefull;
};

export class TruStrap {
  static routes: RouterType;
  static instances: Statefull[] = [];
  constructor(routes: RouterType) {
    TruStrap.routes = routes;
    window.addEventListener("popstate", this.handleRouteChange);

    this.handleRouteChange();
  }
  static navigation(path: string) {
    let instantiate = true;
    if (window.location.pathname != path)
      window.history.pushState({}, "", path);
    console.log(path);
    this.instances.forEach((instance) => {
      if (instance.root == path) {
        instantiate = false;
        instance.renderDom();
      }
    });
    if (instantiate) {
      this.instances.push(this.routes[path]);
      this.routes[path].renderDom();
    }
  }

  handleRouteChange() {
    const currentURL = window.location.pathname;
    TruStrap.navigation(currentURL);
  }
}
/**
 * Generates a unique ID.
 *
 * @return {string} A randomly generated unique ID.
 */
export function generateId(): string {
  return "_+" + Math.random().toString(36).substring(2, 15);
}
