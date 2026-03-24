/**
 * @file validator.error.ts
 * @class validatorErrorClass
 *
 * @description
 * Typed error thrown when a validator helper detects that a value does not satisfy a required
 * condition (e.g. null HTML element, invalid peer type, peer not found in store).
 * Used by error handlers and use case error handlers to identify validation failures
 * and, in some cases, trigger specific recovery behaviour (e.g. replying NOT_FOUND to the caller).
 *
 * @extends baseErrorClass
 *
 * @thrownBy
 * - validatorHelper methods (e.g. checkHTMLElement, checkStore, checkPeerInStore, checkSocket)
 *
 * @see baseErrorClass  - (client/js/base/errors/classes/base.error.ts)
 * @see errorHandler.propagateErrorValidator / wrapErrorValidator
 */
import { baseErrorClass } from "./base.error.js";

export class validatorErrorClass extends baseErrorClass {}
