/**
 * @file useCase.error.ts
 * @class useCaseErrorClass
 *
 * @description
 * Typed error thrown when a failure occurs within the use case layer. Use case errors
 * are the outermost catch boundary before the error reaches the top-level entry point.
 * They are always logged (logIt defaults to true in wrapErrorUseCase/propagateErrorUseCase).
 *
 * @extends baseErrorClass
 *
 * @thrownBy
 * - All use case execute() static methods (callRequest, callAccepted, callRejected,
 *   strangerInitialization, agentInitialization, etc.)
 *   via useCaseErrors.executeDefault or errorHandler.propagateErrorUseCase
 *
 * @see baseErrorClass  - (client/js/base/errors/classes/base.error.ts)
 * @see errorHandler.propagateErrorUseCase / wrapErrorUseCase
 */
import { baseErrorClass } from "./base.error.js";

export class useCaseErrorClass extends baseErrorClass {}
