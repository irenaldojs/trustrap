import { Page, Widget } from "../core/framework";
import { Button, Div, H1, H5, Icon, Span } from "../core/widgets";

export class Home extends Page{
    constructor(root: string){
        super(root)       
    }
    mountState(): void {
        this.createState("count", 0)
    }
    mountTree(): Widget {
        return new Div({
            classWidget: "vh-100 d-flex justify-content-center align-items-center bg-secondary px-2 px-sm-0",
        }, [
            new Div({
                classWidget: "col-12 col-sm-8 col-md-6 text-center border border-dark rounded p-5 bg-light",
            }, [
                new H1({ classWidget: "mb-5" }, "Ola mundo!"),
                new Div({}, [
                    new H5({ classWidget: "mb-3" }, "Teste da framework, com controle de estado pela pagina renderizada"),
                    new Button({
                        variant: "success",
                        outline: true,
                        size: "sm",
                        onClick: () => {
                            this.setState("count", this.getState("count") + 1)
                        }
                    }, [
                        new Span({id: "contador", observers: ["count"], classWidget: "px-2"}, "Contagem " + this.getState("count")),                        
                    ])
                ]),
                new Div({classWidget: "my-2 d-flex justify-content-around gap-2 fs-1"}, [
                    new Icon({ classWidget: "text-purple"}, "bootstrap", "brands"),
                    new Icon({ classWidget: "text-primary-emphasis"}, "font-awesome", "regular"),
                    new Icon({ classWidget: "text-dark"}, "github", "brands"),
                    new Icon({ classWidget: "text-success"}, "npm", "brands"),
                    new Icon({ classWidget: "text-primary"}, "linkedin", "brands"),
                    new Icon({ classWidget: "text-dark"}, "square-x-twitter", "brands"),
                    new Icon({ classWidget: "text-primary"}, "facebook", "brands"),
                    new Icon({ classWidget: "text-danger"}, "instagram", "brands"),
                    new Icon({ classWidget: "text-danger"}, "youtube", "brands"),
                    
                ])
            ])
        ])
    }
}
