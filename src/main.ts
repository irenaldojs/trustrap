import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./style.css";
import { RouterType, createTruStrap } from "./core/framework";
import { Home, Dashboard, Pokedex } from "./app/routes";

("Instance App");

const routers: RouterType = {
  "/": { page: Home, root: "app" },
  "/dashboard": { page: Dashboard, root: "app" },
  "/pokedex": { page: Pokedex, root: "app" },
};

createTruStrap(routers);
