/**
 * @file eventHandler.error.ts
 * @class eventHandlerErrorClass
 *
 * @description
 * Typed error thrown when a failure occurs within the event handler layer — the layer that
 * maps socket or DOM events to use case execute() calls. Allows failures in event wiring
 * or dispatch to be identified distinctly from service or use case failures.
 *
 * @extends baseErrorClass
 *
 * @thrownBy
 * - socketEventHandler, webRTCEventHandler, and all UI *.eventHandler.ts classes
 *   via errorHandler.propagateErrorEventHandler / wrapErrorEventHandler
 *
 * @see baseErrorClass  - (client/js/base/errors/classes/base.error.ts)
 * @see errorHandler.propagateErrorEventHandler / wrapErrorEventHandler
 */
import { baseErrorClass } from "./base.error.js";
export class eventHandlerErrorClass extends baseErrorClass {}
