import { ChildrenType, Widget, WidgetType } from "./framework";

export class Div extends Widget {
  constructor(params: WidgetType, children?: ChildrenType) {
    params.tag = "div";
    super(params, children);
  }
}
export class FutureBuild extends Widget {
  futureBuild: Boolean = true;
  constructor(params: WidgetType, children?: ChildrenType) {
    params.tag = "div";
    super(params, children);
  }
}

interface HType extends WidgetType {
  tag: string;
  text: string;
}
class H extends Widget {
  constructor(
    { tag, text }: HType,
    params: WidgetType,
    children?: ChildrenType
  ) {
    params.tag = tag;
    var newChildren: ChildrenType = [text];
    if (children) newChildren = newChildren.concat(children);
    super(params, newChildren);
  }
}
export class H1 extends H {
  constructor(text: string, params?: WidgetType, children?: ChildrenType) {
    {
      super(
        {
          tag: "h1",
          text,
        },
        params ?? {},
        children
      );
    }
  }
}
export class H2 extends H {
  constructor(text: string, params?: WidgetType, children?: ChildrenType) {
    {
      super(
        {
          tag: "h2",
          text,
        },
        params ?? {},
        children
      );
    }
  }
}
export class H3 extends H {
  constructor(text: string, params?: WidgetType, children?: ChildrenType) {
    {
      super(
        {
          tag: "h3",
          text,
        },
        params ?? {},
        children
      );
    }
  }
}
export class H4 extends H {
  constructor(text: string, params?: WidgetType, children?: ChildrenType) {
    {
      super(
        {
          tag: "h4",
          text,
        },
        params ?? {},
        children
      );
    }
  }
}
export class H5 extends H {
  constructor(text: string, params?: WidgetType, children?: ChildrenType) {
    {
      super(
        {
          tag: "h5",
          text,
        },
        params ?? {},
        children
      );
    }
  }
}
export class H6 extends H {
  constructor(text: string, params?: WidgetType, children?: ChildrenType) {
    {
      super(
        {
          tag: "h6",
          text,
        },
        params ?? {},
        children
      );
    }
  }
}
export class P extends H {
  constructor(text: string, params?: WidgetType, children?: ChildrenType) {
    {
      super(
        {
          tag: "p",
          text,
        },
        params ?? {},
        children
      );
    }
  }
}
export class Span extends H {
  constructor(text: string, params?: WidgetType, children?: ChildrenType) {
    {
      super(
        {
          tag: "span",
          text,
        },
        params ?? {},
        children
      );
    }
  }
}
interface ButtonType {
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark";
  outline?: boolean;
  size?: "sm" | "md" | "lg";
}
export class Button extends Widget {
  variant?: string;
  constructor(
    { variant, outline, size }: ButtonType,
    params: WidgetType,
    children?: ChildrenType
  ) {
    params.tag = "button";
    super(params, children);

    this.variant = variant ?? "primary";
    let classBtn = "btn btn-";
    outline ? (classBtn += "outline-") : false;
    classBtn += this.variant;
    size ? (classBtn += " btn-" + size) : false;
    let classWidgetFinal = classBtn;

    if (params.classWidget != undefined) {
      classWidgetFinal += " " + params.classWidget;
    }
    this.classWidget = classWidgetFinal;
  }
}
export class Img extends Widget {
  constructor(src: string, params?: WidgetType, children?: ChildrenType) {
    params = params ?? {};
    params.tag = "img";
    params.src = src;
    super(params, children);
  }
}

export class Spinner extends Widget {
  constructor(params?: WidgetType) {
    params = params ?? {};
    params.classWidget = params.classWidget + " spinner-border";
    params.tag = "div";

    super(params, [
      new Span("Loading...", {
        classWidget: "visually-hidden",
        role: "status",
      }),
    ]);
  }
}
