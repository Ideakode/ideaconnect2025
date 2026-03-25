/**
 * @file useCase.error.ts
 * @class useCaseErrorClass
 *
 * @description
 * Typed error for failures that occur in use case execute methods.
 * Extends baseErrorClass with no additional properties; the class name
 * is used by errorTypes.USE_CASE and errorHandler.createError for identification.
 * Produced by errorHandler.wrapErrorUseCase in use case catch blocks.
 */
import { baseErrorClass } from "./base.error.js";

export class useCaseErrorClass extends baseErrorClass {}
