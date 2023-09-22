import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./style.css";
import { TruStrap } from "./core/framework";

import { Home } from "./app/Home";
import { Dashboard } from "./app/Dashboard";

("Instance App");

new TruStrap({
  "/": new Home("app"),
  "/dashboard": new Dashboard("app"),
});
