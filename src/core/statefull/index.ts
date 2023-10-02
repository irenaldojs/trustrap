import { TruStrap, Widget } from "..";

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
      this.virtualDom?.renderElement(parent, 0);
    }
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
    let list: Array<Widget> = [];

    const pushList = (newWidget: Widget) => {
      list.push(newWidget);
    };

    this.updateTreeState(newVirtualDom, nameState, pushList);

    list.forEach((item, index) => {
      if (item.params.id) {
        const oldElement = document.getElementById(item.params.id);
        const parentElement = oldElement?.parentElement;
        if (oldElement && parentElement) {
          item.renderElement(parentElement, index, oldElement);
        }
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
        if (child.params.observers) {
          child.params?.observers.forEach((observer) => {
            if (observer == nameState) {
              pushList(child);
            }
          });
        }
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
