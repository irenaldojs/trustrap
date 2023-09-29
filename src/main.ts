import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./style.css";
import { createTruStrap } from "./core/framework";
import { Home, Dashboard, Pokedex } from "./app/routes";

("Instance App");

createTruStrap({
  "/": { render: Home, root: "app" },
  "/dashboard": { render: Dashboard, root: "app" },
  "/pokedex": { render: Pokedex, root: "app" },
});
