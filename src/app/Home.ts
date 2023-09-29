import { Statefull, Widget } from "../core/framework";
import { Button, H1, H5, Span, Div } from "../core/widgets";
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
          "vh-100 d-flex justify-content-center align-items-center bg-secondary px-2 px-sm-0",
      },
      [
        Div(
          {
            name: "home",
            classWidget:
              "col-12 col-sm-8 col-md-6 text-center border border-dark rounded p-5 bg-light",
          },
          [
            H1("Ola mundo!", { classWidget: "mb-2" }),
            Div({}, [H5("Teste da framework", { classWidget: "mb-3" })]),
            Div(
              {
                classWidget:
                  "my-2 d-flex justify-content-center gap-2 fs-1 flex-wrap",
              },
              [
                FaBrands("font-awesome", {
                  classWidget: "text-primary-emphasis",
                }),
                FaBrands("bootstrap", { classWidget: "text-purple" }),
                FaBrands("github", { classWidget: "text-dark" }),
                FaBrands("npm", { classWidget: "text-success" }),
                FaSolid("graduation-cap", { classWidget: "text-dark" }),
              ]
            ),
            Div({ classWidget: "mt-3 d-flex justify-content-center gap-2" }, [
              Button(
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
                  size: "sm",
                },
                { onClick: () => this.navigation("/dashboard") },
                ["Rota do Dashboard"]
              ),
              Button(
                {
                  variant: "primary",
                  size: "sm",
                },
                { onClick: () => this.navigation("/pokedex") },
                ["Rota do Pokedex"]
              ),
            ]),
          ]
        ),
      ]
    );
  }
}
