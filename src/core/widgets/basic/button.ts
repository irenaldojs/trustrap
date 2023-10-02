import { Widget } from "..";
import { ChildrenType, WidgetType } from "../types/index.ts";

export function _button(params?: WidgetType, children?: ChildrenType) {
  params = {
    ...params,
    tag: "button",
  };
  return new Widget(params, children);
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
