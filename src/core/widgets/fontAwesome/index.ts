import { Widget } from "../index.ts";
import { WidgetType } from "../types/index.ts";
import { IconStyle } from "./types/IconStyle.ts";
import iconBrandsName from "./types/iconBrandsName.ts";
import IconRegularName from "./types/iconRegularName.ts";
import iconSolidName from "./types/iconSolidName.ts";

type IconType = WidgetType & {
  iconName: string;
  iconType?: IconStyle;
};

class Icon extends Widget {
  constructor(params?: IconType) {
    let className = params?.class ?? "";
    className += " fa-" + params?.iconType + " fa-" + params?.iconName;

    const iconParams = {
      ...params,
      class: className,
      tag: "i",
    };
    delete iconParams.iconName;
    delete iconParams.iconType;

    super(iconParams, []);
  }
}

type faBrandsType = IconType & {
  iconName: iconBrandsName;
};

export function _faBrands(params: faBrandsType) {
  params = {
    ...params,
    iconName: params.iconName,
    iconType: "brands",
  };
  return new Icon(params);
}

type faSolidType = IconType & {
  iconName: iconSolidName;
};

export function _faSolid(params: faSolidType) {
  params = {
    ...params,
    iconName: params.iconName,
    iconType: "solid",
  };
  return new Icon(params);
}

type faRegularType = IconType & {
  iconName: IconRegularName;
};

export function _faRegular(params: faRegularType) {
  params = {
    ...params,
    iconName: params.iconName,
    iconType: "regular",
  };
  return new Icon(params);
}
