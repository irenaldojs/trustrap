import { Widget } from "../widgets";
import { ChildrenType, WidgetType } from "../widgetsType";
import { IconStyle } from "./types/IconStyle";
import iconBrandsName from "./types/iconBrandsName";
import IconRegularName from "./types/iconRegularName";
import iconSolidName from "./types/iconSolidName";

interface IconType {
  iconName: string;
  iconType: IconStyle;
}

class Icon extends Widget {
  constructor(
    { iconName, iconType }: IconType,
    params?: WidgetType,
    children?: ChildrenType
  ) {
    var className = params?.class ?? "";
    className += " fa-" + iconType + " fa-" + iconName;
    params = {
      ...params,
      class: className,
      tag: "i",
    };
    super(params, children);
  }
}

export function _faBrands(
  iconName: iconBrandsName,
  params?: WidgetType,
  children?: ChildrenType
) {
  return new Icon({ iconName, iconType: "brands" }, params, children);
}

export function _faSolid(
  iconName: iconSolidName,
  params?: WidgetType,
  children?: ChildrenType
) {
  return new Icon({ iconName, iconType: "solid" }, params, children);
}

export function _faRegular(
  iconName: IconRegularName,
  params?: WidgetType,
  children?: ChildrenType
) {
  return new Icon({ iconName, iconType: "regular" }, params, children);
}
