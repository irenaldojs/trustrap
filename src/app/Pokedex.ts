import { Statefull, Widget } from "../core";
import { _div, _h1, _h4, _img, _span } from "../core/widgets/basic";
import { _bsButton, _bsSpinner } from "../core/widgets/boostrap";
import { _faSolid } from "../core/widgets/fontAwesome";

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
    this.createState("pokemons", [_bsSpinner()]);
    this.createState("maxPage", 10);
    this.mountPokemonsDiv();
  }

  async mountPokemonsDiv() {
    this.data = await fetchPokemons(
      this.getState("maxPage"),
      (this.getState("page") - 1) * this.getState("maxPage")
    );
    await this.data.sort((a: PokemonDataType, b: PokemonDataType) =>
      a.id > b.id ? 1 : -1
    );
    let children: Widget[] = [];
    await this.data.forEach((pokemon: PokemonDataType) => {
      const div = _div(
        {
          class: `d-flex flex-column align-items-center justify-content-between 
            card-pokemon col-12 col-sm-4 col-md-3 col-lg-2 rounded border border-3 border-dark`,
        },
        [
          _div({ class: "bg-pokemon w-100 d-flex justify-content-center" }, [
            _img(pokemon.sprite, {
              class: "img-pokemon img-fluid",
            }),
          ]),
          _div({ class: "bg-data w-100 text-light" }, [
            _span(formatId(pokemon.id), { class: "text-start ps-2 fs-6" }),
            _h4(pokemon.name, {
              class: "text-center text-capitalize ps-2 fw-bold",
            }),
            _div(
              {
                class:
                  "w-100 d-flex justify-content-center gap-2 text-uppercase",
              },
              pokemon.types.map((type: string) => {
                return _span(type, {
                  class: "py-1 px-2 mb-1 rounded types " + type,
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
    const maxPages = Math.floor(649 / this.getState("maxPage")) + 1;
    return _div(
      {
        class: "v-100 w-100 p-4 bg-danger bg-pokedex",
      },
      [
        _div({}, [
          _bsButton(
            {
              variant: "success",
              class: "d-flex justify-content-center align-items-center gap-1",
              click: () => this.navigation("/"),
            },
            [_faSolid({ iconName: "arrow-left" }), "Voltar"]
          ),
          _h1("POKEDEX", { class: "text-light text-center" }),
        ]),
        _div(
          {
            id: "pokedex",
            observers: ["pokemons", "page"],
            class:
              "bg-light rounded border border-3 border-dark p-1 d-flex flex-wrap justify-content-center gap-1",
          },
          this.getState("pokemons")
        ),
        _div({ class: "d-flex justify-content-center gap-3 mt-2" }, [
          _bsButton(
            {
              variant: "success",
              click: () => {
                if (this.getState("page") > 1) {
                  this.setState("page", this.getState("page") - 1);
                }
                this.mountPokemonsDiv();
              },
            },
            [_faSolid({ iconName: "arrow-left", class: "fs-1" })]
          ),
          _span(this.getState("page") + "/" + maxPages, {
            id: "page",
            observers: ["page"],
            class: "px-2 bg-light fs-1 rounded",
          }),
          _bsButton(
            {
              variant: "success",
              click: () => {
                if (this.getState("page") < maxPages) {
                  this.setState("page", this.getState("page") + 1);
                }
                this.mountPokemonsDiv();
              },
            },
            [_faSolid({ iconName: "arrow-right", class: "fs-1" })]
          ),
        ]),
      ]
    );
  }
}

function formatId(id: number) {
  return "# " + id.toString().padStart(4, "0");
}
