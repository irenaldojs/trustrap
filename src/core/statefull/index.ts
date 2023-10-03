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
  }

  abstract render(): Widget;
  mountState(): void {}

  renderDom(): void {
    const parent = document.getElementById(this.root);

    if (parent) {
      parent.innerHTML = "";
      this.virtualDom?.renderElement(parent, 0);
    }
  }
  createState(nameState: string, value: any): void {
    this.state = {
      ...this.state,
      [nameState]: value,
    };
  }
  getState(name: string): any {
    return this.state[name];
  }
  setState(stateName: string, value: any): void {
    this.state = {
      ...this.state,
      [stateName]: value,
    };
    this.updateVirtualDom(stateName);
  }
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
