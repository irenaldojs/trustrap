import { Widget } from "..";
import { ChildrenType, WidgetType } from "../types/index.ts";

type BsButtonType = WidgetType & {
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark"
    | "outline-primary"
    | "outline-secondary"
    | "outline-success"
    | "outline-danger"
    | "outline-warning"
    | "outline-info"
    | "outline-light"
    | "outline-dark";
  size?: "sm" | "md" | "lg";
};

export function _bsButton(params?: BsButtonType, children?: ChildrenType) {
  let classButton = "btn";
  const variant = params?.variant ?? "primary";
  const size = params?.size ?? "md";
  classButton += " btn-" + variant + " btn-" + size;
  classButton += " " + params?.class;
  params = {
    ...params,
    class: classButton,
    tag: "button",
  };
  return new Widget(params, children);
}
