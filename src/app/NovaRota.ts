import { FaSolid } from "../core/fontAwesome/icons";
import { Statefull, Widget } from "../core/framework";
import { Button, Div, H3 } from "../core/widgets";

export default class Dashboard extends Statefull {
  constructor(root: string) {
    super(root);
  }
  render(): Widget {
    return Div(
      {
        classWidget:
          "vh-100 d-flex justify-content-center align-items-center bg-secondary px-2 px-sm-0",
      },
      [
        Div(
          {
            classWidget:
              "col-12 col-sm-8 col-md-6 text-center border border-dark rounded p-5 bg-light d-flex flex-column gap-3",
          },
          [
            H3("Volte e veja que o estado da contagem permanece o mesmo"),
            Button(
              { variant: "primary" },
              {
                classWidget:
                  "d-flex align-items-center justify-content-center gap-2",
                onClick: () => {
                  this.navigation("/");
                },
              },
              [FaSolid("arrow-left"), "Voltar"]
            ),
          ]
        ),
      ]
    );
  }
}
