import { _div } from "../core/widgets/basic/div";
import { _h3 } from "../core/widgets/basic/headText";
import { _bsButton } from "../core/widgets/boostrap/button";
import { _faSolid } from "../core/widgets/fontAwesome";
import { Widget } from "../core/widgets";
import { Statefull } from "../core";

export default class Dashboard extends Statefull {
  constructor(root: string) {
    super(root);
  }
  render(): Widget {
    return _div(
      {
        class:
          "vh-100 d-flex justify-content-center align-items-center bg-secondary px-2 px-sm-0",
      },
      [
        _div(
          {
            class:
              "col-12 col-sm-8 col-md-6 text-center border border-dark rounded p-5 bg-light d-flex flex-column gap-3",
          },
          [
            _h3("Volte e veja que o estado da contagem permanece o mesmo"),
            _bsButton(
              {
                variant: "primary",
                class: "d-flex align-items-center justify-content-center gap-2",
                click: () => {
                  this.navigation("/");
                },
              },
              [_faSolid({ iconName: "arrow-left" }), "Voltar"]
            ),
          ]
        ),
      ]
    );
  }
}
