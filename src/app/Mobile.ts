import { Statefull, Widget } from "../core";

export default class Mobile extends Statefull {
  constructor(root: string) {
    super(root);
  }

  render(): Widget {
    throw new Error("Method not implemented.");
  }
}
