/**
 * @file class.error.ts
 * @class classErrorClass
 *
 * @description
 * Typed error for failures that occur inside class constructors or class-level methods.
 * Extends baseErrorClass with no additional properties; the class name
 * is used by errorTypes.CLASS and errorBuilder.createError for identification.
 */
import { baseErrorClass } from "./base.error.js";

export class classErrorClass extends baseErrorClass {}
