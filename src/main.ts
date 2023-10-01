import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./style.css";
import { RouterType, createTruStrap } from "./core/statefull_core";
import { Home, NovaRota, Pokedex } from "./app/routes";

("Instance App");

const routers: RouterType = {
  "/": { page: Home, root: "app" },
  "/novaRota": { page: NovaRota, root: "app" },
  "/pokedex": { page: Pokedex, root: "app" },
};

createTruStrap(routers);
