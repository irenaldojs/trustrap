import { Widget } from "..";
import { ChildrenType, WidgetType } from "../types/index.ts";

export function _div(params: WidgetType, children?: ChildrenType) {
  return new Widget(params, children);
}
