import { Statefull, Widget } from "../core/framework";
import { Div, Span } from "../core/widgets";

export class Dashboard extends Statefull {
  constructor(root: string) {
    super(root);
  }
  mountState(): void {}
  mountTree(): Widget {
    return new Div({
      classWidget: "vh-100 d-flex justify-content-center align-items-center bg-secondary px-2 px-sm-0",
    }, [
      new Span("Ola mundo!"),
    ])
  }
}