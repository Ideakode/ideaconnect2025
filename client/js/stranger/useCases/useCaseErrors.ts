/**
 * @file useCaseErrors.ts
 *
 * @description
 * Centralises error handling for use cases. Provides a single
 * executeDefault utility that wraps any thrown error using
 * errorHandler.wrapErrorUseCase, tagging it with the caller's
 * class name and method name.
 *
 * All stranger use cases call useCaseErrors.executeDefault inside
 * their catch blocks to maintain consistent error propagation.
 */
import { errorHandler } from "../errors/errors.js";

const executeDefault = (by: string, method: string, error: unknown) => {
  errorHandler.wrapErrorUseCase(by, error, method);
};

export const useCaseErrors = {
  executeDefault,
};
