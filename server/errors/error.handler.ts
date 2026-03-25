/**
 * @file error.handler.ts
 * @class errorHandler
 *
 * @description
 * Central error handling utility for the server. All methods are static.
 * Provides creation, wrapping, propagation, and throwing of typed errors.
 * All service, use case, and event handler code routes through this class.
 *
 * @staticMethods
 * - createError(type, err, msg, method)
 *     Instantiates the correct typed error class based on the error type string.
 *     Supports: PARSER, VALIDATOR, SERVICE, BASE, USE_CASE, EVENT_HANDLER.
 *
 * - wrapError(by, type, error, method, logIt?)
 *     Re-wraps an existing baseErrorClass instance into a new typed error.
 *     Non-baseErrorClass errors pass through unchanged.
 *
 * - propagateError(by, type, error, method, logIt?)
 *     Wraps then throws the error. Used to bubble up typed errors through layers.
 *
 * - propagateErrorParser / propagateErrorValidator / propagateErrorService
 * - propagateErrorBase / propagateErrorUseCase / propagateErrorEventHandler
 *     Convenience wrappers for propagateError with the correct type preset.
 *
 * - throwError(by, error, logIt?)
 *     Logs the error (via logErrors) and throws it.
 *
 * - wrapErrorUseCase(by, error, method, logIt?)
 *     Wraps as a USE_CASE error without throwing. Used in use case catch blocks
 *     where the error is logged but execution should continue.
 *
 * @see errorBuilder  — provides pre-built error instances
 * @see logErrors     — handles console output
 */
import {
  serviceErrorClass,
  baseErrorClass,
  parserErrorClass,
  validatorErrorClass,
  useCaseErrorClass,
  eventHandlerErrorClass,
} from "./classes/classes.js";
import { getBaseErrorInterface } from "./baseError.interface.js";
import { errorTypes } from "./errorTypes.js";
import { logErrors } from "../logs/logs.js";

export class errorHandler {
  public static createError(
    type: string,
    err: string,
    msg: string,
    method: string
  ):
    | baseErrorClass
    | parserErrorClass
    | validatorErrorClass
    | serviceErrorClass
    | useCaseErrorClass
    | eventHandlerErrorClass {
    const errIF = getBaseErrorInterface(err, msg, method);
    switch (type) {
      case errorTypes.PARSER:
        return new parserErrorClass(errIF);
      case errorTypes.VALIDATOR:
        return new validatorErrorClass(errIF);
      case errorTypes.SERVICE:
        return new serviceErrorClass(errIF);
      case errorTypes.BASE:
        return new baseErrorClass(errIF);
      case errorTypes.USE_CASE:
        return new useCaseErrorClass(errIF);
      case errorTypes.EVENT_HANDLER:
        return new eventHandlerErrorClass(errIF);
      default:
        return new baseErrorClass(errIF);
    }
  }

  public static wrapError(
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

  public static throwError(
    by: string,
    error: unknown,
    logIt: boolean = true
  ): never {
    if (logIt) logErrors.send(by, error);
    throw error;
  }
  public static wrapErrorUseCase(
    by: string,
    error: unknown,
    method: string,
    logIt: boolean = true
  ) {
    const type = errorTypes.USE_CASE;
    return this.wrapError(by, type, error, method, logIt);
  }
}
