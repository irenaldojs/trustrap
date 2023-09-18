import { ChildrenType, Widget, WidgetType } from "./core"

type HType = {
    number ?: number
    text : string
    classCSS?: string
}
class H extends Widget {
    constructor({number, text}: HType) {
        super({
            tag: "h" + (number ?? 1).toString()
        })
        this.children = [text]
    }
}

export class H1 extends H {
    constructor({text, classCSS
     } :{text: string, classCSS?: string}){
        super({
            number: 1,
            text: text,
            classCSS: classCSS
        })
    }
}

export class H2 extends H {
    constructor({text, classCSS
     } :{text: string, classCSS?: string}){
        super({
            number: 2,
            text: text,
            classCSS: classCSS
        })
    }
}

export class H3 extends H {
    constructor({text, classCSS
     } :{text: string, classCSS?: string}){
        super({
            number: 3,
            text: text,
            classCSS: classCSS
        })
    }
}

export class H4 extends H {
    constructor({text, classCSS
     } :{text: string, classCSS?: string}){
        super({
            number: 4,
            text: text,
            classCSS: classCSS
        })
    }
}

export class H5 extends H {
    constructor({text, classCSS
     } :{text: string, classCSS?: string}){
        super({
            number: 5,
            text: text,
            classCSS: classCSS
        })
    }
}

export class H6 extends H {
    constructor({text, classCSS
     } :{text: string, classCSS?: string}){
        super({
            number: 6,
            text: text,
            classCSS: classCSS
        })
    }
}

type ButtonType = {
    variant?: "primary" | "secondary" | "success"
    classCSS?: string
    onClick?: Function
    children?: ChildrenType
}
export class Button extends Widget {
    onClick?: Function

    constructor({variant, classCSS, onClick, children }: ButtonType){
        super({
            tag: "button",
            children: children,
            classCSS: classCSS + ` btn btn-${variant ?? "primary"}`
        })
        this.onClick = onClick
        this.element.onclick = () => {
            if(onClick)
                onClick()
        }
    }
}
