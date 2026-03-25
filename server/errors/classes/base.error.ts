/**
 * @file base.error.ts
 * @class baseErrorClass
 *
 * @description
 * Root error class for all server errors. Extends the native Error class
 * with a method property that records which method the error originated in.
 * All other error classes (parser, validator, service, useCase, eventHandler,
 * class) extend this class.
 *
 * @properties
 * - name    (from Error) — set to the error name string from the error interface.
 * - message (from Error) — the human-readable error message.
 * - method              — the name of the method where the error was created.
 *
 * @see errorHandler — creates instances via createError
 * @see errorBuilder — creates instances via factory methods
 */
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
