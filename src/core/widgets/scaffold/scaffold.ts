import { Widget } from "..";
import { _div } from "../basic";
import { WidgetType } from "../types";

type ScaffoldType = WidgetType & {
  topBar?: Widget;
  leftBar?: Widget;
  container: Widget;
  rightBar?: Widget;
  bottomBar?: Widget;
};

export function _scaffold(params: ScaffoldType) {
  let { topBar, leftBar, container, rightBar, bottomBar, ...widgetParams } =
    params;
  widgetParams = {
    class: widgetParams.class + " vh-100",
  };
  if (
    params.topBar &&
    params.leftBar &&
    params.container &&
    params.rightBar &&
    params.bottomBar
  ) {
    return _div(widgetParams, [
      _div({ class: "col h-75" }, [
        params.topBar!,
        _div(
          {
            class: "d-flex h-100 justify-content-between",
          },
          [
            params.leftBar!,
            _div({ class: "h-100" }, [params.container!]),
            params.rightBar!,
          ]
        ),
        params.bottomBar!,
      ]),
    ]);
  }

  if (params.topBar && params.leftBar && params.container && params.rightBar) {
    return _div(widgetParams, [
      params.topBar!,
      _div(
        {
          class: "d-flex flex-grow-1 justify-content-between",
        },
        [
          params.leftBar!,
          _div({ class: "flex-grow-1" }, [params.container!]),
          params.rightBar!,
        ]
      ),
    ]);
  }

  if (params.topBar && params.leftBar && params.container) {
    return _div(widgetParams, [
      params.topBar!,
      _div(
        {
          class:
            "container-fluid h-100 m-0 p-0 d-flex flex-row justify-content-between",
        },
        [params.leftBar!, _div({ class: "flex-grow-1" }, [params.container!])]
      ),
    ]);
  }

  if (params.topBar && params.leftBar) {
    return _div(widgetParams, [
      params.topBar!,
      _div(
        {
          class:
            "container-fluid h-100 m-0 p-0 d-flex flex-row justify-content-between",
        },
        [params.leftBar!]
      ),
    ]);
  }

  return _div({}, []);
}
