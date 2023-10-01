import { Widget } from "../widgets";
import { WidgetType } from "../widgetsType";

export function _span(text: string, params?: WidgetType) {
  params = {
    ...params,
    tag: "span",
  };
  return new Widget(params, [text]);
}
