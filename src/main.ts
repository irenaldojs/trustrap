import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./style.css";
import { Home, NovaRota, Pokedex, Scaffold } from "./app/routes";
import { RouterType, createTruStrap } from "./core";

("Instance App");

const routers: RouterType = {
  "/": { page: Home, root: "app" },
  novaRota: { page: NovaRota, root: "app" },
  pokedex: { page: Pokedex, root: "app" },
  scaffold: { page: Scaffold, root: "app" },
};

createTruStrap(routers);
