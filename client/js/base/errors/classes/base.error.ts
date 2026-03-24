/**
 * @file base.error.ts
 * @class baseErrorClass
 *
 * @description
 * Root class of the typed error hierarchy. Extends the native JavaScript Error class
 * with an additional `method` property to record which method threw the error.
 * All domain-specific error classes (parser, validator, service, etc.) extend this class,
 * allowing error type to be identified via instanceof checks or the error's name property.
 *
 * @extends Error
 *
 * @properties
 * - name    (inherited via super.name)  - Set from baseErrorInterface.name; used to identify
 *                                         error type (matches the class name, e.g. "parserErrorClass").
 * - message (inherited via super)       - Human-readable error description.
 * - method  (_method)                   - Name of the method in which the error originated.
 *
 * @constructor
 * @param {baseErrorInterface} baseErrorIF - Object with { name, message, method }.
 *                                           Built via getBaseErrorInterface() in baseError.interface.ts.
 *
 * @hierarchy
 * baseErrorClass
 *   ├── parserErrorClass       - errors from parser helpers
 *   ├── validatorErrorClass    - errors from validator helpers
 *   ├── serviceErrorClass      - errors from service layer
 *   ├── uiErrorClass           - errors from UI layer
 *   ├── useCaseErrorClass      - errors from use case layer
 *   ├── eventHandlerErrorClass - errors from event handler layer
 *   └── classErrorClass        - errors from class/domain model layer
 *
 * @see errorHandler   - (client/js/base/errors/error.handler.ts) wraps and propagates these errors
 * @see errorTypes     - (client/js/base/errors/errorTypes.ts) maps layer names to class name strings
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
