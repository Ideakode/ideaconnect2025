/**
 * @file validator.error.ts
 * @class validatorErrorClass
 *
 * @description
 * Typed error for failures that occur in validatorHelper methods.
 * Extends baseErrorClass with no additional properties. This class is
 * specifically checked by useCaseErrors.replyNotFoundIfNeeded using
 * `instanceof validatorErrorClass` to detect "peer not in store" conditions.
 *
 * @see useCaseErrors    — catches this class for NOT_FOUND recovery
 * @see validatorHelper  — throws this class via errorHandler
 */
import { baseErrorClass } from "./base.error.js";

export class validatorErrorClass extends baseErrorClass {}
