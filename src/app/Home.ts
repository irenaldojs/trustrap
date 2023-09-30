import { Statefull, Widget } from "../core/framework";
import { Button, H1, Span, Div, Img } from "../core/widgets";
import { FaBrands, FaSolid } from "../core/fontAwesome/icons";

export default class Home extends Statefull {
  constructor(root: string) {
    super(root);
  }

  mountState(): void {
    this.createState("count", 0);
  }

  render(): Widget {
    return Div(
      {
        classWidget:
          "vh-100 d-flex justify-content-center align-items-center bg-home px-2 px-sm-0 rounded",
      },
      [
        Div(
          {
            name: "home",
            classWidget:
              "col-12 col-sm-8 col-md-6 text-center border border-dark rounded-4     p-5 card-home d-flex flex-column gap-3",
          },
          [
            Div({ classWidget: "d-flex justify-content-center gap-2" }, [
              H1("TruStrap", {
                classWidget: "mb-2 fw-bold text-light fst-italic",
              }),
              FaSolid("graduation-cap", {
                classWidget:
                  "text-dark fs-1 rounded-5 p-1 text-center bg-light lh-1 ",
              }),
            ]),
            Div(
              {
                classWidget:
                  "my-2 fs-1 p-1 d-flex justify-content-center gap-3 ",
              },
              [
                FaBrands("font-awesome", {
                  classWidget:
                    "text-primary-emphasis bg-light rounded p-1 icon-home",
                }),
                FaBrands("bootstrap", {
                  classWidget: "text-purple bg-light rounded p-1 icon-home",
                }),
                FaBrands("github", {
                  classWidget: "text-dark bg-light rounded p-1 icon-home",
                }),
                FaBrands("npm", {
                  classWidget: "text-success bg-light rounded p-1 icon-home",
                }),
                Img("Typescript_logo.svg", {
                  classWidget: "icon-home bg-light rounded p-1",
                }),
              ]
            ),
            Div({ classWidget: "mt-3 d-flex justify-content-center gap-2" }, [
              Button(
                {
                  variant: "success",
                  size: "lg",
                },
                {
                  onClick: () =>
                    this.setState("count", this.getState("count") + 1),
                },
                [
                  Span("Contagem " + this.getState("count"), {
                    id: "contador",
                    observers: ["count"],
                    classWidget: "px-2",
                  }),
                ]
              ),
              Button(
                {
                  variant: "primary",
                  size: "lg",
                },
                { onClick: () => this.navigation("/novaRota") },
                ["Nova Rota"]
              ),
              Button(
                {
                  variant: "primary",
                  size: "lg",
                },
                { onClick: () => this.navigation("/pokedex") },
                ["Pokedex"]
              ),
            ]),
          ]
        ),
      ]
    );
  }
}
