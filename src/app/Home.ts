import { Page, Widget } from "../core/framework";
import { Button, Div, H1, H5 } from "../core/widgets";

export class Home extends Page{
    
    constructor(root: string){
        super(root)       
    }
    mountState(): void {
        this.createState("count", 0)
    }
    mountTree(): Widget {

        return new Div({
            classWidget: "vh-100 d-flex justify-content-center align-items-center bg-secondary",
        }, [
            new Div({
                classWidget: "col-6 text-center border border-dark rounded p-5 bg-light",
            }, [
                new H1({ id: "h1", text: "Olá mundo!", classWidget: "mb-5" }),
                new Div({}, [
                    new H5({ id: "h5", text: "Teste da framework, com controle de estado pela pagina renderizada", classWidget: "mb-5" }),
                    new Button({
                        id: "button_count",
                        observers: ["count"],
                        variant: "success",
                        classWidget: "px-3 fs-2",
                        onClick: () => {
                            this.setState("count", this.getState("count") + 1)
                        }
                    }, [
                        "Contagem " + this.getState("count")
                    ])
                ])
            ])
        ])
    }
}
