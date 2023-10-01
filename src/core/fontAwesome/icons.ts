import { ChildrenType, Widget, WidgetType } from "../widgets/widgets";
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
    params = params ?? {};
    params.tag = "i";
    super(params, children);
    let classIcon = "fa-" + iconType + " fa-" + iconName;
    this.classWidget = classIcon + " " + params.classWidget ?? false;
  }
}
class FaBrandsIcon extends Icon {
  constructor(
    iconName: iconBrandsName,
    params?: WidgetType,
    children?: ChildrenType
  ) {
    super({ iconName, iconType: "brands" }, params, children);
  }
}
export function FaBrands(
  iconName: iconBrandsName,
  params?: WidgetType,
  children?: ChildrenType
) {
  return new FaBrandsIcon(iconName, params, children);
}
class FaSolidIcon extends Icon {
  constructor(
    iconName: iconSolidName,
    params?: WidgetType,
    children?: ChildrenType
  ) {
    super({ iconName, iconType: "solid" }, params, children);
  }
}
export function FaSolid(
  iconName: iconSolidName,
  params?: WidgetType,
  children?: ChildrenType
) {
  return new FaSolidIcon(iconName, params, children);
}
class FaRegularIcon extends Icon {
  constructor(
    iconName: IconRegularName,
    params?: WidgetType,
    children?: ChildrenType
  ) {
    super({ iconName, iconType: "regular" }, params, children);
  }
}

export function FaRegular(
  iconName: IconRegularName,
  params?: WidgetType,
  children?: ChildrenType
) {
  return new FaRegularIcon(iconName, params, children);
}
