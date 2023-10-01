import { ChildrenType, WidgetType } from "./widgetsType";

export type WidgetTypeOld = {
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

export class oldWidget {
  id?: string;
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
    }: WidgetTypeOld,
    children?: ChildrenType
  ) {
    observers ? (this.observers = observers) : false;
    this.id = id;
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
  renderElement(parent: Element, index: number, oldElement?: Element): Element {
    this.element = document.createElement(this.tag ?? "div");
    if (this.id == undefined) {
      this.id = parent.id + "_" + index;
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
  /**
   * Updates the element of the widget with the provided widget.
   *
   * @return {void} This function does not return a value.
   */
  configElement(): void {
    if (!this.element || this.id == undefined) return;

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

export class Widget {
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
        console.log(oldElement);
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
