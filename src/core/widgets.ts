import { ChildrenType, Widget, WidgetType } from "./framework";

export class Div extends Widget{
    constructor({id, classWidget}: WidgetType, children?: ChildrenType){
        super({
            id,
            classWidget,
            tag: "div",
        }, children)
    }
}

interface HType extends WidgetType{
    text: string
}

class H extends Widget{
    constructor({ id, classWidget, tag, observers }: WidgetType, text: string){
        super({
            id,
            classWidget,
            tag: tag,
            observers
        }, [text])
    }
}

export class H1 extends H {
    constructor({ id, classWidget, observers  }: WidgetType, text: string) {
        super({
            id,
            classWidget,
            tag: "h1",
            observers,            
        }, text);
    }
}
export class H2 extends H {
    constructor({ id, classWidget, observers  }: WidgetType, text: string) {
        super({
            id,
            classWidget,
            tag: "h2",
            observers,            
        }, text);
    }
}
export class H3 extends H {
    constructor({ id, classWidget, observers  }: WidgetType, text: string) {
        super({
            id,
            classWidget,
            tag: "h3",
            observers,            
        }, text);
    }
}
export class H4 extends H {
    constructor({ id, classWidget, observers  }: WidgetType, text: string) {
        super({
            id,
            classWidget,
            tag: "h4",
            observers,            
        }, text);
    }
}
export class H5 extends H {
    constructor({ id, classWidget, observers  }: WidgetType, text: string) {
        super({
            id,
            classWidget,
            tag: "h5",
            observers,            
        }, text);
    }
}
export class H6 extends H {
    constructor({ id, classWidget, observers  }: WidgetType, text: string) {
        super({
            id,
            classWidget,
            tag: "h6",
            observers,            
        }, text);
    }
}
export class P extends H{
    constructor({ id, classWidget, observers  }: WidgetType, text: string) {
        super({
            id,
            classWidget,
            tag: "p",
            observers,            
        }, text);
    }
}
export class Span extends H{
    constructor({ id, classWidget, observers  }: WidgetType, text: string) {
        super({
            id,
            classWidget,
            tag: "span",
            observers,            
        }, text);
    }
}
interface ButtonType extends WidgetType{
    variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark"
    outline?: boolean
    size?: "sm" | "md" | "lg"
}

export class Button extends Widget{
    variant?: string

    constructor({ id, classWidget, onClick, variant, observers, outline, size  }: ButtonType, children?: ChildrenType){
        super({
            id,
            tag: "button",        
            onClick,
            observers
        }, children)
        this.variant = variant ?? "primary"        
        let classBtn = "btn btn-"
        outline ? classBtn += "outline-" : false
        classBtn += this.variant
        size ? classBtn += " btn-" + size : false
        let classWidgetFinal = classBtn

        if (classWidget != undefined ){
            classWidgetFinal += " "+classWidget
        }
        this.classWidget = classWidgetFinal
    }
}

type IconType = "brands" | "solid" | "regular"

export class Icon extends Widget{
    constructor({ id, classWidget, onClick, observers  }: WidgetType, iconName: string, iconType: IconType){
        super({
            id,
            tag: "i",
            onClick,
            observers
        }, [])
        let type = iconType ?? "solid"
        let classIcon = "fa-" + type + " fa-" + iconName
        this.classWidget = classIcon + " " + classWidget
    }
}