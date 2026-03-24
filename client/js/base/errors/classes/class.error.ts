/**
 * @file class.error.ts
 * @class classErrorClass
 *
 * @description
 * Typed error thrown when a failure occurs within the domain model / class layer.
 * Used to distinguish errors that originate in class constructors or class methods
 * (e.g. storeClass, webRTCClass and their subclasses) from errors at higher layers.
 *
 * @extends baseErrorClass
 *
 * @thrownBy
 * - Domain model class methods (storeClass, webRTCClass, storeAgentClass, storeStrangerClass)
 *   via errorHandler.propagateErrorClass / wrapErrorClass
 *
 * @see baseErrorClass  - (client/js/base/errors/classes/base.error.ts)
 * @see errorHandler.propagateErrorClass / wrapErrorClass
 */
import { baseErrorClass } from "./base.error.js";

export class classErrorClass extends baseErrorClass {}
