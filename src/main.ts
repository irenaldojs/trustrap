import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./style.css";
import { TruStrap } from "./core/framework";

import {Home, Dashboard, Pokedex} from "./app/routes"

("Instance App");

const app = new TruStrap({
  "/": Home,
  "/dashboard": Dashboard,
  "/pokedex": Pokedex,
});
