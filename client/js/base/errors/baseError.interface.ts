/**
 * @file baseError.interface.ts
 *
 * @description
 * Defines the data shape required to construct any error in the typed error hierarchy,
 * and provides the factory function used by errorBuilder and errorHandler to build it.
 *
 * @interface baseErrorInterface
 * - name    - Error type identifier, typically the class name (e.g. "parserErrorClass").
 *             Set as Error.name via super.name in baseErrorClass.
 * - message - Human-readable description of what went wrong.
 * - method  - Name of the method in which the error originated.
 *
 * @function getBaseErrorInterface(name, message, method)
 * Factory helper that constructs a baseErrorInterface object.
 * Called by errorBuilder.createError() and errorHandler.createError() before
 * passing the result to new parserErrorClass(errIF) / new serviceErrorClass(errIF) etc.
 *
 * @see baseErrorClass  - (client/js/base/errors/classes/base.error.ts) consumes this interface
 * @see errorBuilder    - primary caller of getBaseErrorInterface
 */
export interface baseErrorInterface {
  name: string;
  message: string;
  method: string;
}

export const getBaseErrorInterface = (
  name: string,
  message: string = "",
  method: string = ""
): baseErrorInterface => {
  const baseError: baseErrorInterface = {
    name,
    message,
    method,
  };
  return baseError;
};
