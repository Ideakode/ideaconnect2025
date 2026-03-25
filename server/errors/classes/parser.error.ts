/**
 * @file parser.error.ts
 * @class parserErrorClass
 *
 * @description
 * Typed error for failures that occur in parserHelper methods.
 * Extends baseErrorClass with no additional properties; the class name
 * is used by errorTypes.PARSER and errorHandler.createError for identification.
 */
import { baseErrorClass } from "./base.error.js";

export class parserErrorClass extends baseErrorClass {}
