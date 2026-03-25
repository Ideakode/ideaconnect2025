/**
 * @file eventHandler.error.ts
 * @class eventHandlerErrorClass
 *
 * @description
 * Typed error for failures that occur in socketEventHandler methods.
 * Extends baseErrorClass with no additional properties; the class name
 * is used by errorTypes.EVENT_HANDLER and errorHandler.createError for identification.
 */
import { baseErrorClass } from "./base.error.js";
export class eventHandlerErrorClass extends baseErrorClass {}
