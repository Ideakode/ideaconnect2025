/**
 * @file errorTypes.ts
 * @const errorTypes
 *
 * @description
 * Maps symbolic error type keys to the corresponding class name strings.
 * Used by errorHandler.createError and errorBuilder.createError to select
 * the correct error class at runtime.
 *
 * Keys: PARSER, VALIDATOR, SERVICE, BASE, USE_CASE, EVENT_HANDLER, CLASS
 *
 * @see errorHandler — passes errorTypes values to createError
 * @see errorBuilder — passes errorTypes values to createError
 */
import {
  parserErrorClass,
  validatorErrorClass,
  serviceErrorClass,
  baseErrorClass,
  useCaseErrorClass,
  eventHandlerErrorClass,
  classErrorClass,
} from "./classes/classes.js";

export const errorTypes = {
  PARSER: parserErrorClass.name,
  VALIDATOR: validatorErrorClass.name,
  SERVICE: serviceErrorClass.name,
  BASE: baseErrorClass.name,
  USE_CASE: useCaseErrorClass.name,
  EVENT_HANDLER: eventHandlerErrorClass.name,
  CLASS: classErrorClass.name,
};
