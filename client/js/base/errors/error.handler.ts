/**
 * @file error.handler.ts
 * @class errorHandler
 *
 * @description
 * Central static utility for wrapping, re-typing, logging, and throwing errors across all
 * architectural layers. The two fundamental operations are:
 *
 * - **wrap**      — converts an existing baseErrorClass into a new typed error of the target layer
 *                   (e.g. a parserError caught in a service becomes a serviceError).
 *                   Returns the wrapped error without throwing. Optionally logs it.
 * - **propagate** — wraps then immediately throws (return type: never). Always logs by default.
 * - **throwError** — throws the error as-is (no re-typing). Logs if logIt is true.
 *
 * @staticMethods — one wrap/propagate pair per layer
 * - wrapErrorParser / propagateErrorParser
 * - wrapErrorValidator / propagateErrorValidator
 * - wrapErrorService / propagateErrorService
 * - wrapErrorUI / propagateErrorUI
 * - wrapErrorUseCase / propagateErrorUseCase    (logIt defaults to true)
 * - wrapErrorEventHandler / propagateErrorEventHandler
 * - wrapErrorClass / propagateErrorClass
 * - wrapErrorBase / propagateErrorBase          (logIt defaults to true)
 * - throwError(by, error, logIt)                (shared terminal throw)
 *
 * @param by     - name of the calling class (used as label in logErrors.send)
 * @param error  - unknown caught value; only re-typed if it is a baseErrorClass instance
 * @param method - name of the calling method, stored in the resulting error's .method property
 * @param logIt  - whether to call logErrors.send (default false for wrap, true for propagate/throw)
 *
 * @see errorBuilder  - constructs typed errors with standard messages
 * @see logErrors     - (client/js/base/logs/logErrors.ts) performs the actual console output
 * @see errorTypes    - (client/js/base/errors/errorTypes.ts) maps layer names to class name strings
 */
import {
  parserErrorClass,
  validatorErrorClass,
  serviceErrorClass,
  baseErrorClass,
  useCaseErrorClass,
  classErrorClass,
  uiErrorClass,
  eventHandlerErrorClass,
} from "./classes/classes.js";
import { errorTypes } from "./errorTypes.js";
import { getBaseErrorInterface } from "./baseError.interface.js";

import { logErrors } from "../logs/logs.js";

export class errorHandler {
  private static createError(
    type: string,
    err: string,
    msg: string,
    method: string
  ): baseErrorClass {
    const errIF = getBaseErrorInterface(err, msg, method);
    switch (type) {
      case errorTypes.PARSER:
        return new parserErrorClass(errIF);
      case errorTypes.VALIDATOR:
        return new validatorErrorClass(errIF);
      case errorTypes.SERVICE:
        return new serviceErrorClass(errIF);
      case errorTypes.UI:
        return new uiErrorClass(errIF);
      case errorTypes.BASE:
        return new baseErrorClass(errIF);
      case errorTypes.USE_CASE:
        return new useCaseErrorClass(errIF);
      case errorTypes.EVENT_HANDLER:
        return new eventHandlerErrorClass(errIF);
      case errorTypes.CLASS:
        return new classErrorClass(errIF);
      default:
        return new baseErrorClass(errIF);
    }
  }

  public static wrapErrorClass(
    by: string,
    error: unknown,
    method: string,
    logIt: boolean = false
  ) {
    const type = errorTypes.CLASS;
    return this.wrapError(by, type, error, method, logIt);
  }
  public static wrapErrorEventHandler(
    by: string,
    error: unknown,
    method: string,
    logIt: boolean = false
  ) {
    const type = errorTypes.EVENT_HANDLER;
    return this.wrapError(by, type, error, method, logIt);
  }

  public static wrapErrorParser(
    by: string,
    error: unknown,
    method: string,
    logIt: boolean = false
  ) {
    const type = errorTypes.PARSER;
    return this.wrapError(by, type, error, method, logIt);
  }
  public static wrapErrorService(
    by: string,
    error: unknown,
    method: string,
    logIt: boolean = false
  ) {
    const type = errorTypes.SERVICE;
    return this.wrapError(by, type, error, method, logIt);
  }
  public static wrapErrorUI(
    by: string,
    error: unknown,
    method: string,
    logIt: boolean = false
  ) {
    const type = errorTypes.UI;
    return this.wrapError(by, type, error, method, logIt);
  }

  public static wrapErrorValidator(
    by: string,
    error: unknown,
    method: string,
    logIt: boolean = false
  ) {
    const type = errorTypes.VALIDATOR;
    return this.wrapError(by, type, error, method, logIt);
  }
  public static wrapErrorUseCase(
    by: string,
    error: unknown,
    method: string,
    logIt: boolean = true
  ) {
    const type = errorTypes.USE_CASE;
    const err = this.wrapError(by, type, error, method, logIt);
    return err;
  }
  public static wrapErrorBase(
    by: string,
    error: unknown,
    method: string,
    logIt: boolean = true
  ) {
    const type = errorTypes.BASE;
    const err = this.wrapError(by, type, error, method, logIt);
    return err;
  }
  private static wrapError(
    by: string,
    type: string,
    error: unknown,
    method: string,
    logIt: boolean = false
  ) {
    let err = error;
    if (error instanceof baseErrorClass) {
      err = this.createError(type, error.name, error.message, method);
    }
    if (logIt) logErrors.send(by, err);
    return err;
  }

  public static propagateError(
    by: string,
    type: string,
    error: unknown,
    method: string,
    logIt: boolean = true
  ): never {
    const err = this.wrapError(by, type, error, method, false);
    this.throwError(by, err, logIt);
  }

  public static propagateErrorParser(
    by: string,
    error: unknown,
    method: string,
    logIt: boolean = true
  ): never {
    const parser = errorTypes.PARSER;
    this.propagateError(by, parser, error, method, logIt);
  }
  public static propagateErrorClass(
    by: string,
    error: unknown,
    method: string,
    logIt: boolean = true
  ): never {
    const parser = errorTypes.CLASS;
    this.propagateError(by, parser, error, method, logIt);
  }
  public static propagateErrorValidator(
    by: string,
    error: unknown,
    method: string,
    logIt: boolean = true
  ): never {
    const parser = errorTypes.VALIDATOR;
    this.propagateError(by, parser, error, method, logIt);
  }
  public static propagateErrorService(
    by: string,
    error: unknown,
    method: string,
    logIt: boolean = true
  ): never {
    const parser = errorTypes.SERVICE;
    this.propagateError(by, parser, error, method, logIt);
  }
  public static propagateErrorBase(
    by: string,
    error: unknown,
    method: string,
    logIt: boolean = true
  ): never {
    const parser = errorTypes.BASE;
    this.propagateError(by, parser, error, method, logIt);
  }
  public static propagateErrorUseCase(
    by: string,
    error: unknown,
    method: string,
    logIt: boolean = true
  ): never {
    const parser = errorTypes.USE_CASE;
    this.propagateError(by, parser, error, method, logIt);
  }
  public static propagateErrorEventHandler(
    by: string,
    error: unknown,
    method: string,
    logIt: boolean = true
  ): never {
    const parser = errorTypes.EVENT_HANDLER;
    this.propagateError(by, parser, error, method, logIt);
  }
  public static propagateErrorUI(
    by: string,
    error: unknown,
    method: string,
    logIt: boolean = true
  ): never {
    const parser = errorTypes.UI;
    this.propagateError(by, parser, error, method, logIt);
  }

  public static throwError(
    by: string,
    error: unknown,
    logIt: boolean = true
  ): never {
    if (logIt) logErrors.send(by, error);
    throw error;
  }
}
