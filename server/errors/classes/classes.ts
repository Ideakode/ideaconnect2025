/**
 * @file classes.ts  (errors/classes)
 *
 * @description
 * Barrel re-export for all server error classes:
 * baseErrorClass, parserErrorClass, validatorErrorClass, serviceErrorClass,
 * useCaseErrorClass, eventHandlerErrorClass, classErrorClass.
 */
export * from "./base.error.js";
export * from "./parser.error.js";
export * from "./validator.error.js";
export * from "./service.error.js";
export * from "./useCase.error.js";
export * from "./eventHandler.error.js";
export * from "./class.error.js";
