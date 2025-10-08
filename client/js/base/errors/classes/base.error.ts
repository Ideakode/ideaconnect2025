import { baseErrorInterface } from "../errors.js";

export class baseErrorClass extends Error {
  protected _method: string;

  constructor(baseErrorIF: baseErrorInterface) {
    super(baseErrorIF.message);
    super.name = baseErrorIF.name;
    this._method = baseErrorIF.method;
  }

  public get method(): string {
    return this._method;
  }
  public set method(value: string) {
    this._method = value;
  }
}
