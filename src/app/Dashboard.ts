import { FaSolidIcon } from "../core/fontAwesome/icons";
import { Statefull, TruStrap, Widget } from "../core/framework";
import { Button, Div, Span } from "../core/widgets";

export class Dashboard extends Statefull {
  constructor(root: string) {
    super(root);
  }
  mountState(): void {}
  mountTree(): Widget {
    return new Div({
      classWidget: "vh-100 d-flex justify-content-center align-items-center bg-secondary px-2 px-sm-0",
    }, [
      new Div({
        classWidget: "col-12 col-sm-8 col-md-6 text-center border border-dark rounded p-5 bg-light d-flex flex-column gap-3",
      }, [
        new Span("Nova Rota"),
        new Button({ variant: "primary"}, {
          classWidget: "d-flex align-items-center justify-content-center gap-2",
          onClick: () => {
            TruStrap.navigation("/")
          }
        }, [new FaSolidIcon("arrow-left"), "Voltar" ])
      ])    
    ])
  }
}