import { Statefull, Widget } from "../core";
import { _div } from "../core/widgets/basic";
import { _scaffold } from "../core/widgets/scaffold/scaffold";

export default class Scaffold extends Statefull {
  constructor(root: string) {
    super(root);
  }

  render(): Widget {
    return _scaffold({
      class: "bg-info",
      topBar: _div({ class: "d-flex bg-primary p-2" }, ["Topbar"]),
      leftBar: _div({ class: "bg-secondary p-2 col-1" }, ["LeftBar"]),
      container: _div({ class: "bg-danger p-2" }, ["body"]),
      rightBar: _div({ class: "bg-success p-2 col-2" }, ["rightBar"]),
      bottomBar: _div({ class: "d-flex bg-primary p-2" }, ["bottomBar"]),
    });
  }
}
