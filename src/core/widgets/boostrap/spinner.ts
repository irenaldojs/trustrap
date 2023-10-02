import { Widget } from "..";
import { WidgetType } from "../types/index.ts";

export function _bsSpinner(params?: WidgetType) {
  params = {
    ...params,
    tag: "div",
    class: params?.class + " spinner-border",
  };
  return new Widget(params);
}
