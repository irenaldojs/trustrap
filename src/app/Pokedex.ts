import { FaSolid } from "../core/fontAwesome/icons";
import { Statefull, Widget } from "../core/framework";
import { Button, Div, H1, H4, Img, Span, Spinner } from "../core/widgets";

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
  const maxUrl = max ?? 10;
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
    this.createState("pokemons", [Spinner()]);
    this.createState("maxPage", 10);
    this.mountPokemonsDiv();
  }

  async mountPokemonsDiv() {
    this.data = await fetchPokemons(
      this.getState("maxPage"),
      (this.getState("page") - 1) * this.getState("maxPage")
    );
    let children: Widget[] = [];
    await this.data.forEach((pokemon: PokemonDataType) => {
      const div = Div(
        {
          classWidget: `d-flex flex-column align-items-center justify-content-between 
            card-pokemon col-12 col-sm-4 col-md-3 col-lg-2 rounded border border-3 border-dark`,
        },
        [
          Div(
            { classWidget: "bg-pokemon w-100 d-flex justify-content-center" },
            [
              Img(pokemon.sprite, {
                classWidget: "img-pokemon img-fluid",
              }),
            ]
          ),
          Div({ classWidget: "bg-data w-100 text-light" }, [
            Span(formatId(pokemon.id), { classWidget: "text-start ps-2 fs-6" }),
            H4(pokemon.name, {
              classWidget: "text-center text-capitalize ps-2 fw-bold",
            }),
            Div(
              {
                classWidget:
                  "w-100 d-flex justify-content-center gap-2 text-uppercase",
              },
              pokemon.types.map((type: string) => {
                return Span(type, {
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

  render(): Widget {
    return Div(
      {
        classWidget: "v-100 w-100 p-4 bg-danger bg-pokedex",
      },
      [
        Div({}, [
          Button(
            { variant: "success" },
            {
              classWidget:
                "d-flex justify-content-center align-items-center gap-1",
              onClick: () => this.navigation("/"),
            },
            [FaSolid("arrow-left"), "Voltar"]
          ),
          H1("POKEDEX", { classWidget: "text-light text-center" }),
        ]),
        Div(
          {
            id: "pokedex",
            observers: ["pokemons", "page"],
            promise: true,
            classWidget:
              "bg-light rounded border border-3 border-dark p-1 d-flex flex-wrap justify-content-center gap-1",
          },
          this.getState("pokemons")
        ),
        Div({ classWidget: "d-flex justify-content-center gap-3 mt-2" }, [
          Button(
            { variant: "success" },
            {
              onClick: () => {
                if (this.getState("page") > 1) {
                  this.setState("page", this.getState("page") - 1);
                }
                this.mountPokemonsDiv();
              },
            },
            [FaSolid("arrow-left", { classWidget: "fs-1" })]
          ),
          Span(this.getState("page"), {
            id: "page",
            observers: ["page"],
            classWidget: "px-5 bg-light fs-1 rounded",
          }),
          Button(
            { variant: "success" },
            {
              onClick: () => {
                if (this.getState("page") < 800) {
                  this.setState("page", this.getState("page") + 1);
                }
                this.mountPokemonsDiv();
              },
            },
            [FaSolid("arrow-right", { classWidget: "fs-1" })]
          ),
        ]),
      ]
    );
  }
}

function formatId(id: number) {
  return "# " + id.toString().padStart(4, "0");
}
