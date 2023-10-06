import { Widget } from "..";

type ScaffoldType = {
  appbar?: Widget;
  body?: Widget;
  footer?: Widget;
};

export function _scaffold(params: ScaffoldType) {
  const children: Widget[] = [];
  if (params.appbar) children.push(params.appbar);
  if (params.body) children.push(params.body);
  if (params.footer) children.push(params.footer);

  const scaffoldWidget = new Widget({
    tag: "div",
    class: "scaffold",
    children: children,
  });
  return scaffoldWidget;
}
