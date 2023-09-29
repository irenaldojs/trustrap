import { Statefull, Widget } from "../core/framework";
import { Button, Div, H1, H5, Span } from "../core/widgets";
import { FaBrandsIcon, FaSolidIcon } from "../core/fontAwesome/icons";

export default class Home extends Statefull {
  constructor(root: string) {
    super(root);
  }

  mountState(): void {
    this.createState("count", 0);
  }
  mountTree(): Widget {
    return new Div(
      {
        classWidget:
          "vh-100 d-flex justify-content-center align-items-center bg-secondary px-2 px-sm-0",
      },
      [
        new Div(
          {
            name: "home",
            classWidget:
              "col-12 col-sm-8 col-md-6 text-center border border-dark rounded p-5 bg-light",
          },
          [
            new H1("Ola mundo!", { classWidget: "mb-2" }),
            new Div({}, [
              new H5("Teste da framework", { classWidget: "mb-3" }),
            ]),
            new Div(
              {
                classWidget:
                  "my-2 d-flex justify-content-center gap-2 fs-1 flex-wrap",
              },
              [
                new FaBrandsIcon("font-awesome", {
                  classWidget: "text-primary-emphasis",
                }),
                new FaBrandsIcon("bootstrap", { classWidget: "text-purple" }),
                new FaBrandsIcon("github", { classWidget: "text-dark" }),
                new FaBrandsIcon("npm", { classWidget: "text-success" }),
                new FaSolidIcon("graduation-cap", { classWidget: "text-dark" }),
              ]
            ),
            new Div(
              { classWidget: "mt-3 d-flex justify-content-center gap-2" },
              [
                new Button(
                  {
                    variant: "success",
                    outline: true,
                    size: "sm",
                  },
                  {
                    onClick: () =>
                      this.setState("count", this.getState("count") + 1),
                  },
                  [
                    new Span("Contagem " + this.getState("count"), {
                      id: "contador",
                      observers: ["count"],
                      classWidget: "px-2",
                    }),
                  ]
                ),
                new Button(
                  {
                    variant: "primary",
                    size: "sm",
                  },
                  { onClick: () => this.navigation("/dashboard") },
                  ["Rota do Dashboard"]
                ),
                new Button(
                  {
                    variant: "primary",
                    size: "sm",
                  },
                  { onClick: () => this.navigation("/pokedex") },
                  ["Rota do Pokedex"]
                ),
              ]
            ),
          ]
        ),
      ]
    );
  }
}
