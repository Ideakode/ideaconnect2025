/**
 * @file parser.helper.error.handler.ts
 *
 * @description
 * Placeholder file — contents are fully commented out. Originally intended
 * as a parser-specific error handler subclass of errorHandler.
 * Error handling for parserHelper is now handled directly by errorHandler
 * and errorBuilder in parser.helper.ts.
 */
/* import { errorHandler, errorTypes } from "./errors.js";

export class parserHelperErrorHandler extends errorHandler {
  public static readonly _error_if_not_valid = "Interface data is not valid";

  public static ifDataNotValid(method: string, received: unknown) {
    const err = this._error_if_not_valid;
    const msg = "Received: " + JSON.stringify(received);
    const type = errorTypes.PARSER;
    return this.createError(type, err, msg, method);
  }
}
 */
