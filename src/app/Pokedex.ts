import { FaSolidIcon } from "../core/fontAwesome/icons";
import { Statefull, Widget } from "../core/framework";
import { Button, Div, H1, H5, Img, Span, Spinner } from "../core/widgets";

type PokemonBaseType = {
  name: string;
  url: string;
};

export type PokemonDataType = {
  id: number;
  sprite: string;
  name: string;
  types: string[];
};

async function fetchPokemons(
  max: number,
  offset: number
): Promise<PokemonDataType[]> {
  const offsetUrl = offset ?? 0;
  const maxUrl = max ?? 20;
  const url =
    "https://pokeapi.co/api/v2/pokemon" +
      "?offset=" +
      offsetUrl +
      "&limit=" +
      maxUrl ?? 10;
  const pokemons = await fetch(url)
    .then((res) => res.json())
    .then((data) => data.results);

  const result: PokemonDataType[] = [];
  await Promise.all(
    pokemons.map(async (pokemon: PokemonBaseType) => {
      const response = await fetch(pokemon.url);
      if (response.ok) {
        let data = await response.json();
        data = {
          id: data.id,
          sprite: data.sprites.other.dream_world.front_default,
          name: data.name,
          types: data.types.map(
            (type: { type: { name: string } }) => type.type.name
          ),
        };
        result.push(data);
      }
    })
  );
  return result;
}

export default class Pokedex extends Statefull {
  data: any;
  constructor(root: string) {
    super(root);
  }
  mountState(): void {
    this.createState("page", 1);
    this.createState("pokemons", [new Spinner()]);
    this.createState("maxPage", 14);
    this.mountPokemonsDiv();
  }

  async mountPokemonsDiv() {
    this.data = await fetchPokemons(
      this.getState("maxPage"),
      (this.getState("page") - 1) * this.getState("maxPage")
    );
    let children: Widget[] = [];
    await this.data.forEach((pokemon: PokemonDataType) => {
      const div = new Div(
        {
          classWidget: `d-flex flex-column align-items-center justify-content-between 
            bg-light card-pokemon div-pokemon rounded border border-3 border-dark`,
        },
        [
          new Div(
            { classWidget: "bg-pokemon w-100 d-flex justify-content-center" },
            [
              new Img(pokemon.sprite, {
                classWidget: "img-pokemon img-fluid",
              }),
            ]
          ),
          new Div({ classWidget: "w-100 text-center" }, [
            new H5(pokemon.id + " - " + pokemon.name, {
              classWidget: "bg-dark text-light text-capitalize py-1",
            }),
            new Div(
              {
                classWidget:
                  "w-100 d-flex justify-content-center gap-2 text-uppercase",
              },
              pokemon.types.map((type: string) => {
                return new Span(type, {
                  classWidget: "py-1 px-2 mb-1 rounded types " + type,
                });
              })
            ),
          ]),
        ]
      );
      children.push(div);
    });

    if (children.length == this.data.length) {
      this.setState("pokemons", children);
    }
  }

  mountFutureBuild() {
    //this.mountPokemonsDiv();
  }

  mountTree(): Widget {
    return new Div(
      {
        classWidget: "v-100 w-100 p-4 bg-danger",
      },
      [
        new H1("Pokedex", { classWidget: "text-light text-center" }),
        new Div({ classWidget: "d-flex justify-content-center gap-3 mb-2" }, [
          new Button(
            { variant: "success" },
            {
              onClick: () => {
                if (this.getState("page") > 1) {
                  this.setState("page", this.getState("page") - 1);
                }
                this.mountPokemonsDiv();
              },
            },
            [new FaSolidIcon("arrow-left", { classWidget: "fs-1" })]
          ),
          new Span(this.getState("page"), {
            id: "page",
            observers: ["page"],
            classWidget: "px-5 bg-light fs-1 rounded",
          }),
          new Button(
            { variant: "success" },
            {
              onClick: () => {
                if (this.getState("page") < 800) {
                  this.setState("page", this.getState("page") + 1);
                }
                this.mountPokemonsDiv();
              },
            },
            [new FaSolidIcon("arrow-right", { classWidget: "fs-1" })]
          ),
        ]),
        new Div(
          {
            id: "pokedex",
            observers: ["pokemons", "page"],
            promise: true,
            classWidget:
              "bg-light rounded border border-3 border-dark py-4 d-flex flex-wrap justify-content-center gap-3",
          },
          this.getState("pokemons")
        ),
      ]
    );
  }
}
