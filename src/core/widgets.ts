import { ChildrenType, Widget, WidgetType } from "./framework";

class DivClass extends Widget {
  constructor(params: WidgetType, children?: ChildrenType) {
    params.tag = "div";
    super(params, children);
  }
}

export function Div(params: WidgetType, children?: ChildrenType) {
  return new DivClass(params, children);
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
class H1Class extends H {
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
export function H1(text: string, params?: WidgetType, children?: ChildrenType) {
  return new H1Class(text, params, children);
}
class H2Class extends H {
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
export function H2(text: string, params?: WidgetType, children?: ChildrenType) {
  return new H2Class(text, params, children);
}
class H3Class extends H {
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
export function H3(text: string, params?: WidgetType, children?: ChildrenType) {
  return new H3Class(text, params, children);
}
class H4Class extends H {
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
export function H4(text: string, params?: WidgetType, children?: ChildrenType) {
  return new H4Class(text, params, children);
}
class H5Class extends H {
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
export function H5(text: string, params?: WidgetType, children?: ChildrenType) {
  return new H5Class(text, params, children);
}

class H6Class extends H {
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
export function H6(text: string, params?: WidgetType, children?: ChildrenType) {
  return new H6Class(text, params, children);
}
class PClass extends H {
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
export function P(text: string, params?: WidgetType, children?: ChildrenType) {
  return new PClass(text, params, children);
}
class SpanClass extends H {
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
export function Span(
  text: string,
  params?: WidgetType,
  children?: ChildrenType
) {
  return new SpanClass(text, params, children);
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
class ButtonClass extends Widget {
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
export function Button(
  { variant, outline, size }: ButtonType,
  params: WidgetType,
  children?: ChildrenType
) {
  return new ButtonClass({ variant, outline, size }, params, children);
}
class ImgClass extends Widget {
  constructor(src: string, params?: WidgetType, children?: ChildrenType) {
    params = params ?? {};
    params.tag = "img";
    params.src = src;
    super(params, children);
  }
}
export function Img(src: string, params?: WidgetType, children?: ChildrenType) {
  return new ImgClass(src, params, children);
}

class SpinnerClass extends Widget {
  constructor(params?: WidgetType) {
    params = params ?? {};
    params.classWidget = params.classWidget + " spinner-border";
    params.tag = "div";

    super(params, [
      Span("Loading...", {
        classWidget: "visually-hidden",
        role: "status",
      }),
    ]);
  }
}

export function Spinner(params?: WidgetType) {
  return new SpinnerClass(params);
}

interface InputType {
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "datetime"
    | "date"
    | "time"
    | "month"
    | "week"
    | "url"
    | "tel"
    | "color"
    | "range"
    | "search"
    | "file";
  disabled?: boolean;
  form?: string;
  inputmode?: "url" | "email" | "numeric" | "decimal" | "search" | "tel";
  placeholder?: string;
  maxlength?: number;
  min?: number;
  max?: number;
  readonly?: boolean;
  required?: boolean;
  onChange?: Function;
}

export function Input(inputParams: InputType, params?: WidgetType) {
  params = params ?? {};
  params.tag = "input";
  const widget = new Widget(params);
  inputParams.type
    ? widget.element?.setAttribute("type", inputParams.type)
    : false;
  return widget;
}

export function SVG(svg: string, params?: WidgetType) {
  params = params ?? {};
  params.tag = "svg";
  params.src = svg;
  return new Widget(params);
}
