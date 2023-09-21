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
                new H1("Ola mundo!",{ classWidget: "mb-5" }),
                new Div({}, [
                    new H5("Teste da framework, com controle de estado pela pagina renderizada" ,{ classWidget: "mb-3" }),
                    new Button({
                        variant: "success",
                        outline: true,
                        size: "sm",
                    },{
                      onClick: () => {
                      this.setState("count", this.getState("count") + 1)
                      }
                    }, [
                        new Span("Contagem " + this.getState("count"),{id: "contador", observers: ["count"], classWidget: "px-2"}),                        
                    ])
                ]),
                new Div({classWidget: "my-2 d-flex justify-content-around gap-2 fs-1"}, [
                    new Icon({ iconName: "font-awesome", iconType: "brands" },{ classWidget: "text-primary-emphasis"}),
                    new Icon({ iconName: "github", iconType: "brands" },{ classWidget: "text-dark"}),
                    new Icon({ iconName: "bootstrap", iconType: "brands" },{ classWidget: "text-purple"}),
                    new Icon({ iconName: "npm", iconType: "brands" },{ classWidget: "text-success"}),
                    new Icon({ iconName: "linkedin", iconType: "brands" },{ classWidget: "text-primary"}),
                    new Icon({ iconName: "square-x-twitter", iconType: "brands" },{ classWidget: "text-dark"}),
                    new Icon({ iconName: "facebook", iconType: "brands" },{ classWidget: "text-primary"}),
                    new Icon({ iconName: "instagram", iconType: "brands" },{ classWidget: "text-danger"}),
                    new Icon({ iconName: "youtube", iconType: "brands" },{ classWidget: "text-danger"}),
                    
                ])
            ])
        ])
    }
}
