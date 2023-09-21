export type WidgetType = {
    id?: string
    classWidget?: string
    tag?: string
    observers?: string[]
    onClick?: Function
}
export type ChildrenType = (Widget | string | number)[]

export class Widget {
    id: string
    classWidget?: string
    tag?: string
    children?: (Widget | string | number)[]
    parent?: Element
    element?: HTMLElement
    observers: string[] = []
    onClick?: Function
    constructor({
        id,
        classWidget,
        tag,
        onClick,
        observers
    }: WidgetType, children?: ChildrenType) {
        observers ? this.observers = observers : false
        this.id = id ?? generateId()
        classWidget ? this.classWidget = classWidget : false 
        this.tag = tag
        this.children = children
        this.onClick = onClick
    }    
    /**
     * Creates an element and appends it to the parent widget.
     *
     * @param {Element} parentElement - The parent element to append the element to.
     * @throws {Error} If the element is null.
     */
    createElement (parenElement: Element): void {
        this.element = document.createElement(this.tag ?? "div")
        if(this.element){            
            this.element.id = this.id
            if(this.classWidget != undefined)
                this.element.className = this.classWidget
            this.element.onclick = () => {
                if(this.onClick)
                    this.onClick()
            }
            parenElement.append(this.element)
            this.parent = parenElement
        }else{
            throw new Error("Element is null")
        }
    }
    /**
     * Updates the element of the widget with the provided widget.
     *
     * @param {Widget} widget - The widget used to update the element.
     * @return {void} This function does not return a value.
     */
    updateElement(widget: Widget): void {
        var oldElement = document.getElementById(this.id);
        this.element = document.createElement(this.tag ?? "div")
        this.children = widget.children
        if (this.element) {
            this.element.id = widget.id;
            if (widget.classWidget != undefined)
                this.element.className = widget.classWidget;
            this.element.onclick = () => {
                if (widget.onClick)
                    widget.onClick();
            };
        }
        oldElement?.parentNode?.replaceChild(this.element, oldElement);
        this.children?.forEach(child => {
            if (child instanceof Widget) {
                child.updateElement(child)
            } else {
                this.element?.append(child.toString())
            }
        })
    }
}
export type StateType = {
    [key: string]: {
        value: any
        observers: string[]
    }
}

export abstract class Page {
    root: string
    rootElement?: Element | null
    virtualDom?: Widget
    state: StateType = {}

    constructor(root: string){
        this.root = root
        this.rootElement = document.getElementById(this.root)

        this.mountState()
        if(this.rootElement){
            this.virtualDom = this.mountTree()
            this.renderDom()
        }else{
            throw new Error("Root element not found")
        }

    }
    abstract mountState(): void
    abstract mountTree(): Widget
    
    /**
     * Renders the DOM.
     *
     * This function creates the virtual DOM element using the `createElement` method of the `virtualDom`
     * object, if it exists. If the virtual DOM element is successfully created, the function then calls
     * the `renterTree` method to render the tree.
     *
     * @returns {void} This function does not return a value.
     */
    renderDom (): void {
        this.virtualDom?.createElement(this.rootElement!)
        if(this.virtualDom?.element){
            this.renterTree(this.virtualDom)
        }
    }
    /**
     * Recursively renders the tree of widgets starting from the given widget.
     *
     * @param {Widget} widget - The root widget from which to start rendering.
     * @return {void} This function does not return a value.
     */
    renterTree (widget: Widget): void {
        widget.children?.forEach(child => {
            if(child instanceof Widget){
                if(widget.element){                   
                    child.createElement(widget.element)
                }
                this.renterTree(child)
            }else{
                widget.element?.append(child.toString())
            }
        })
    }
    /**
     * Creates a new state with the given name and value.
     *
     * @param {string} name - The name of the state.
     * @param {any} value - The initial value of the state.
     * @return {void} This function does not return anything.
     */
    createState(name: string, value: any): void {        
        this.state[name] = {
            value,
            observers: []
        }
    }
    /**
     * Retrieves the value of a specific state by its name.
     *
     * @param {string} name - The name of the state.
     * @return {any} The value of the state, or undefined if the state does not exist.
     */
    getState(name: string): any {
        return this.state[name]?.value
    }
    /**
     * Sets the value of a specific state property.
     *
     * @param {string} nameState - The name of the state property.
     * @param {any} value - The value to assign to the state property.
     * @return {void} This function does not return a value.
     */
    setState(nameState: string, value: any): void {
        this.state[nameState].value = value
        this.updateVirtualDom(nameState)
    }
    /**
     * Updates the virtual DOM by performing a full re-render of the component.
     *
     * @param {string} nameState - The name of the state to update.
     */
    updateVirtualDom(nameState: string){
        var newVirtualDom = this.mountTree()
        let list:  Widget[] = []
        const pushList = ( newWidget: Widget) => {
            list.push(newWidget)
        }

        this.updateTreeState(newVirtualDom, nameState, pushList)
        list.forEach(widget => {
            console.log(widget)
            widget.updateElement(widget)
        })
        
    }
    /**
     * Updates the state of the tree.
     *
     * @param {Widget} widget - The widget to update the state for.
     * @param {string} nameState - The name of the state to update.
     * @param {Function} pushList - The function to push the child widget to the list.
     */
    updateTreeState(widget: Widget, nameState: string, pushList: Function) {
        widget.children?.forEach((child) => {
            if (child instanceof Widget) {
                child.observers.forEach(observer => {
                    if (observer == nameState) {
                        pushList(child)
                    }
                })
                this.updateTreeState(child, nameState, pushList)
            }
        })
    }
    
}
/**
 * Generates a unique ID.
 *
 * @return {string} A randomly generated unique ID.
 */
export function generateId (): string {
    return "_+" + Math.random().toString(36).substring(2, 15)
}