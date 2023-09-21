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
    constructor({ id, classWidget, tag, text }: HType, children?: ChildrenType){
        super({
            id,
            classWidget,
            tag: tag,
        }, [text])
    }
}

export class H1 extends H {
    constructor({ id, classWidget, text }: HType){
        super({
            id,
            classWidget,
            tag: "h1",
            text
        })
    }
}
export class H2 extends H {
    constructor({ id, classWidget, text }: HType) {
        super({
            id,
            classWidget,
            tag: "h2",
            text
        });
    }
}
export class H3 extends H {
    constructor({ id, classWidget, text }: HType) {
        super({
            id,
            classWidget,
            tag: "h3",
            text
        });
    }
}
export class H4 extends H {
    constructor({ id, classWidget, text }: HType) {
        super({
            id,
            classWidget,
            tag: "h4",
            text
        });
    }
}
export class H5 extends H {
    constructor({ id, classWidget, text }: HType) {
        super({
            id,
            classWidget,
            tag: "h5",
            text
        });
    }
}
export class H6 extends H {
    constructor({ id, classWidget, text }: HType) {
        super({
            id,
            classWidget,
            tag: "h6",
            text
        });
    }
}

interface ButtonType extends WidgetType{
    variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark"
}

export class Button extends Widget{
    constructor({ id, classWidget, onClick, variant, observers  }: ButtonType, children?: ChildrenType){
        super({
            id,
            tag: "button",
            onClick,
            observers
        }, children)
        

        let classWidgetFinal = ""
        if (classWidget != undefined ){
            classWidgetFinal += classWidget
        }
        if(variant != undefined) 
            classWidgetFinal += variant ? " btn btn-" + variant : " btn btn-primary"
        this.classWidget = classWidgetFinal
    }
}