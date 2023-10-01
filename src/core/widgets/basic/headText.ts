import { Widget } from "../widgets";
import { WidgetType } from "../widgetsType";

class HText extends Widget {
  constructor(number: number, text?: string, params?: WidgetType) {
    params = {
      ...params,
      tag: "h" + number,
    };
    super(params, [text ?? ""]);
  }
}

export function _h1(text: string, params?: WidgetType) {
  return new HText(1, text, params);
}

export function _h2(text: string, params?: WidgetType) {
  return new HText(2, text, params);
}

export function _h3(text: string, params?: WidgetType) {
  return new HText(3, text, params);
}

export function _h4(text: string, params?: WidgetType) {
  return new HText(4, text, params);
}

export function _h5(text: string, params?: WidgetType) {
  return new HText(5, text, params);
}

export function _h6(text: string, params?: WidgetType) {
  return new HText(6, text, params);
}
