import { Page, Widget } from "../core/framework";
import { Button, Div, H1, H5, Span } from "../core/widgets";
import { FaBrandsIcon, FaSolidIcon } from "../core/fontAwesome/icons";

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
                name: "home",
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
                    new FaBrandsIcon("font-awesome", { classWidget: "text-primary-emphasis" }),
                    new FaBrandsIcon("bootstrap",{ classWidget: "text-purple"}),
                    new FaBrandsIcon("github",{ classWidget: "text-dark"}),
                    new FaBrandsIcon("npm",{ classWidget: "text-success"}),
                    new FaBrandsIcon("linkedin",{ classWidget: "text-primary"}),
                    new FaBrandsIcon("square-x-twitter",{ classWidget: "text-dark"}),
                    new FaBrandsIcon("facebook",{ classWidget: "text-primary"}),
                    new FaBrandsIcon("instagram",{ classWidget: "text-danger"}),
                    new FaBrandsIcon("youtube", { classWidget: "text-danger" }),
                    new FaSolidIcon("network-wired",{ classWidget: "text-dark"}),
                    
                ])
            ])
        ])
    }
}
