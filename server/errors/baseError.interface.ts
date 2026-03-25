/**
 * @file baseError.interface.ts
 *
 * @description
 * Defines the data shape passed to all error class constructors.
 *
 * @interface baseErrorInterface
 * - name    The error identifier string (matches the error class's name constant).
 * - message Human-readable description of what went wrong.
 * - method  The method name where the error was created.
 *
 * @functions
 * - getBaseErrorInterface(name, message?, method?)  Constructs a baseErrorInterface object.
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
