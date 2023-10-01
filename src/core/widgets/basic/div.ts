import { Widget } from "../widgets";
import { ChildrenType, WidgetType } from "../widgetsType";

export function _div(params: WidgetType, children?: ChildrenType) {
  return new Widget(params, children);
}
