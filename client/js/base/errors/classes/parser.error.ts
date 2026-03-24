/**
 * @file parser.error.ts
 * @class parserErrorClass
 *
 * @description
 * Typed error thrown when a parser helper fails to parse or cast a value into an expected
 * interface or type. Distinguishes parsing failures from other error types in the hierarchy,
 * enabling targeted catch logic and logging.
 *
 * @extends baseErrorClass
 *
 * @thrownBy
 * - parserHelper methods (e.g. parseCommonParamsInterface, parseSocket, parseCallSignalingInterface)
 *
 * @see baseErrorClass  - (client/js/base/errors/classes/base.error.ts)
 * @see errorHandler.propagateErrorParser / wrapErrorParser
 */
import { baseErrorClass } from "./base.error.js";

export class parserErrorClass extends baseErrorClass {}
