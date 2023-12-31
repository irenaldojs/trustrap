import { Widget } from "..";
import { WidgetType } from "../types/index.ts";

export function _img(src: string, params?: WidgetType) {
  params = {
    ...params,
    tag: "img",
    src,
  };
  return new Widget(params);
}
