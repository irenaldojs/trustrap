import { Statefull, Widget } from "../core/framework";
import { Div, H6, Img, P, Span } from "../core/widgets";

export default class Pokedex extends Statefull {
  constructor(root: string) {
    super(root);
  }
  mountState(): void {
    this.createState("maxPokemons", 151);
    this.createState("fetchUrl", "https://pokeapi.co/api/v2/pokemon/");
    this.createState("pokemons", []);

    Array.from({ length: this.getState("maxPokemons") }, (_, i) => {
      fetch(this.getState("fetchUrl") + (i + 1)).then((response) => response.json()).then((data) => {
        return this.setState("pokemons", [...this.getState("pokemons"), data])
          ;
      }).finally(() => {
        this.renderDom();
      });
    });
  }
  mountTree(): Widget {
    return new Div({
      classWidget: "v-100 w-100 p-4 bg-danger"
    }, [
      new Div(
        { id: "pokedex", observers: ["pokemons"], classWidget: "bg-light rounded border border-3 border-dark py-4 d-flex flex-wrap justify-content-center gap-3" },
        this.getState("pokemons").map((pokemon) => {
          return new Div(
            { classWidget: "card border border-3 border-dark bg-pokemon card-pokemon div-pokemon" },
            [
              new Img(pokemon.sprites.other.dream_world.front_default, { classWidget: "card-img-top p-3 img-pokemon " }),
              new Div({ classWidget: "border-top border-secondary rounded text-center bg-light p-1" }, [
                new H6(pokemon.name, { classWidget: "text-capitalize fs-6 bg-dark text-light rounded" }),
                new Span(pokemon.types.map((type) => type.type.name).join(", "), { classWidget: "text-uppercase" }),
              ])

            ]
          );
        })
      )
    ]);
  }
}

