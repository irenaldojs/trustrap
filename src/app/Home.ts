import { Statefull, Widget } from "../core";
import { _div, _h1, _img, _span } from "../core/widgets/basic";
import { _bsButton } from "../core/widgets/boostrap";
import { _faBrands, _faSolid } from "../core/widgets/fontAwesome";

export default class Home extends Statefull {
  constructor(root: string) {
    super(root);
  }

  mountState(): void {
    this.createState("count", 0);
  }

  render(): Widget {
    return _div(
      {
        class:
          "vh-100 d-flex justify-content-center align-items-center bg-home px-2 px-sm-0 rounded",
      },
      [
        _div(
          {
            name: "home",
            class:
              "col-12 col-sm-8 col-md-4 text-center border border-dark rounded-4 p-5 card-home d-flex flex-column gap-3",
          },
          [
            _div({ class: "d-flex justify-content-center gap-2" }, [
              _h1("TruStrap", {
                class: "mb-2 fw-bold text-light fst-italic",
              }),
              _faSolid({
                iconName: "graduation-cap",
                class:
                  "text-dark fs-1 rounded-5 p-1 text-center bg-light lh-1 ",
              }),
            ]),
            _div(
              {
                class:
                  "my-2 fs-1 p-1 d-flex justify-content-center gap-3 flex-wrap",
              },
              [
                _img("vitejs.svg", {
                  class: "icon-home bg-light rounded p-1",
                }),
                _img("typescript.svg", {
                  class: "icon-home bg-light rounded p-1",
                }),
                _faBrands({
                  iconName: "font-awesome",
                  class: "text-primary-emphasis bg-light rounded p-1 icon-home",
                }),
                _faBrands({
                  iconName: "bootstrap",
                  class: "text-purple bg-light rounded p-1 icon-home",
                }),
              ]
            ),
            _div(
              {
                class: "mt-3 d-flex justify-content-center gap-2 flex-wrap",
              },
              [
                _bsButton(
                  {
                    variant: "warning",
                    click: () => {
                      this.setState("count", this.getState("count") + 1);
                    },
                  },
                  [
                    _span("Contagem " + this.getState("count"), {
                      id: "countButton",
                      observers: ["count"],
                      class: "px-2",
                    }),
                  ]
                ),
                _bsButton(
                  {
                    variant: "primary",
                    size: "lg",
                    click: () => this.navigation("novaRota"),
                  },
                  ["Nova Rota"]
                ),
                _bsButton(
                  {
                    variant: "primary",
                    size: "lg",
                    click: () => this.navigation("pokedex"),
                  },
                  ["Pokedex"]
                ),
              ]
            ),
          ]
        ),
      ]
    );
  }
}
