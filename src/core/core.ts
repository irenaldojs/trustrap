export type ChildrenType =  (Widget | string | number)[] 
export type WidgetType = {
    tag?: string
    children?: ChildrenType
    classCSS?: string
}

export class Widget {
    id: string
    tag?: string
    classCSS?: string
    element: HTMLElement
    children? : ChildrenType

    constructor({tag, classCSS, children}: WidgetType) {                      
        this.id = generateId()      
        this.children = children ?? []
        this.tag = tag ?? 'div'
        this.element = document.createElement(this.tag)
        this.classCSS = classCSS

        this.element?.setAttribute("id", this.id! )
    }

    mountTree(): void {
        this.children?.forEach(child => {
            if(child instanceof Widget)
                this.element?.appendChild(child.render())
            else {
                this.element?.appendChild(document.createTextNode(`${child}`))
            }
        })
    }

    update(){
        var $element = document.getElementById(this.element.id)
        
        if($element){
            $element!.innerHTML = ""
            const newChildren = this.render()
        }
    }

    render(): HTMLElement {    
    if(this.classCSS)
        this.element.className = this.classCSS
    this.mountTree()
    return this.element!

    }
}


function generateId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

