import { ChildrenType, WidgetType } from "./types";

class Widget {
  params: WidgetType = <WidgetType>{};

  element?: HTMLElement;
  parent?: Element;
  children?: Array<Widget | string | number>;

  constructor(params?: WidgetType, children?: ChildrenType) {
    this.params = { ...this.params, ...params };
    this.children = children;
  }

  renderElement(parent: Element, index: number, oldElement?: Element): Element {
    this.element = document.createElement(this.params.tag ?? "div");

    if (this.params.id == undefined) {
      this.params.id = parent.id + "_" + index;
    }
    if (this.element) {
      this.configElement();

      if (oldElement) {
        parent?.replaceChild(this.element, oldElement);
      } else if (parent) {
        parent.append(this.element);
        this.parent = parent;
      }

      if (this.children && this.element) {
        this.children.forEach((child, index) => {
          if (child instanceof Widget) {
            child.renderElement(this.element!, index);
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

  configElement(): void {
    if (!this.element || this.params.id == undefined) return;

    if (this.params.class != undefined)
      this.element.className = this.params.class;

    for (var key in this.params) {
      var object: any = this.params;
      type Types = keyof WidgetType;
      const isType: Types[] = ["observers", "children", "tag"];

      if (typeof object[key] == "function") {
        this.element.addEventListener(key.toLowerCase(), object[key]);
      } else if (!isType.includes(key as Types)) {
        this.element.setAttribute(key, object[key]);
      }
    }
  }
}

export { Widget };
