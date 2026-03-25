/**
 * @file service.error.ts
 * @class serviceErrorClass
 *
 * @description
 * Typed error for failures that occur in service methods (socket, store).
 * Extends baseErrorClass with no additional properties; the class name
 * is used by errorTypes.SERVICE and errorHandler.createError for identification.
 */
import { baseErrorClass } from "./base.error.js";

export class serviceErrorClass extends baseErrorClass {}
