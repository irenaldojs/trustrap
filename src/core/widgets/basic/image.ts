import { Widget } from "../widgets";
import { WidgetType } from "../widgetsType";

export function _img(src: string, params?: WidgetType) {
  params = {
    ...params,
    tag: "img",
    src,
  };
  return new Widget(params);
}
