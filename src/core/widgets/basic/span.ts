import { Widget } from "..";
import { WidgetType } from "../types/index.ts";

export function _span(text: string, params?: WidgetType) {
  params = {
    ...params,
    tag: "span",
  };
  return new Widget(params, [text]);
}
